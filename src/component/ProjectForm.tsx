import { memo, useState } from 'react'
import { GoXCircle } from 'react-icons/go'
import Dropzone from 'react-dropzone'
import Input from './UI/Form/Input/Input'
import TextArea from './UI/Form/TextArea'
import useForm from '../hooks/useForm'
import { ProjectCreateDTO, projectCreateSchema, ProjectUpdateDTO, projectUpdateSchema } from '../validators/project/projectCreate.validator'
import Button from './UI/Button'
import { Store, useAppStore } from '../state/store'
import { useShallow } from 'zustand/shallow'
import { Project } from '../entities/project.entity'

type ProjectFormProps<T extends boolean> = {
  onClose: () => void
  edit?: T
} & (T extends true ? { project: Project } : unknown)

const selectors = (state: Store) => ({
  updating: state.project.updating,
  create: state.project.create,
  update: state.project.update,
})

function ProjectForm<T extends boolean>({ onClose, edit, ...rest }: ProjectFormProps<T>) {
  const [file, setFile] = useState<File | undefined>(undefined)

  const { updating, create, update } = useAppStore(useShallow(selectors))

  const handleSubmit = async (data: ProjectCreateDTO | ProjectUpdateDTO) => {
    if (edit) {
      const proj = (rest as ProjectFormProps<true>).project
      await update(proj.id, data as ProjectUpdateDTO, file)
    } else {
      await create(data as ProjectCreateDTO, file)
    }

    onClose()
  }

  const { control, submitHandler } = useForm(
    edit ? projectUpdateSchema : projectCreateSchema,
    handleSubmit,
    edit ? (rest as ProjectFormProps<true>).project : { title: '', description: '' }
  )

  return (
    <div className={`relative p-4 w-full bg-opacity-30 rounded-lg backdrop-blur-sm text-secondary-12 bg-primary-3 border-primary-7`}>
      <h3 className="text-center">Create New Project</h3>

      <form onSubmit={submitHandler} className="flex flex-col gap-1 mt-4 text-sm">
        {file ? (
          <div className="relative">
            <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover mb-3 rounded-lg aspect-video" />

            <button
              onClick={() => setFile(undefined)}
              className={`absolute -top-3 -right-3 bg-opacity-30 rounded-full backdrop-blur-sm text-secondary-12`}
            >
              <GoXCircle className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => setFile(acceptedFiles[0] as File)}
            accept={{
              'image/*': ['.jpg', '.jpeg', '.png'],
            }}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="p-2 text-center rounded-md border-2 border-dashed border-secondary-7">
                <input {...getInputProps()} />
                <p>Project Image (Optional)</p>
              </div>
            )}
          </Dropzone>
        )}

        <Input name="title" control={control} containerClassName="mt-4">
          Project Title
        </Input>

        <TextArea name="description" control={control}>
          Project Description
        </TextArea>

        <div className="gap-2 items-center sm:flex">
          <Input
            type="checkbox"
            name="public"
            control={control}
            containerClassName="flex gap-4 items-center mt-1.5 mb-[1.375rem]"
            className="mt-0 mb-0 w-fit"
          >
            Public (defaults to false)
          </Input>

          <Button type="submit" isLoading={updating} className="mx-auto mt-8">
            Submit
          </Button>
        </div>
      </form>

      <button onClick={onClose} className={`absolute -top-3 -right-3 rounded-full text-primary-12 bg-secondary-3`}>
        <GoXCircle className="w-6 h-6" />
      </button>
    </div>
  )
}

export default memo(ProjectForm) as typeof ProjectForm
