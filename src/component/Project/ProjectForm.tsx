import { FC, memo, useState } from 'react'
import { GoXCircle } from 'react-icons/go'
import Dropzone from 'react-dropzone'
import { useShallow } from 'zustand/shallow'
import { Project } from '../../entities'
import { Store, useAppStore } from '../../state/store'
import { ProjectCreateDTO, ProjectUpdateDTO, projectUpdateSchema, projectCreateSchema } from '../../validators/project.validator'
import TextArea from '../UI/Form/TextArea'
import useForm from '../../hooks/useForm'
import Input from '../UI/Form/Input/Input'
import Button from '../UI/Button'

type ProjectFormProps = {
  onClose: () => void
} & ({ edit: true; project: Project } | { edit?: false; project?: never })

const selectors = (state: Store) => ({
  loading: state.project.loading,
  create: state.project.create,
  update: state.project.update,
  meId: state.user.meId,
})

const ProjectForm: FC<ProjectFormProps> = ({ onClose, edit, project }) => {
  const [file, setFile] = useState<File | undefined | null>(undefined)

  const { loading, create, update, meId } = useAppStore(useShallow(selectors))

  const handleSubmit = async (data: ProjectCreateDTO | ProjectUpdateDTO) => {
    if (edit) {
      await update(project.id, data as ProjectUpdateDTO, file)
    } else {
      await create(data as ProjectCreateDTO, meId!, file || undefined)
    }

    onClose()
  }

  const { control, submitHandler } = useForm(
    edit ? projectUpdateSchema : projectCreateSchema,
    handleSubmit,
    edit ? project : { title: '', description: '' }
  )

  return (
    <div className={`relative p-4 w-full bg-opacity-30 rounded-lg backdrop-blur-sm text-secondary-12 bg-primary-3 border-primary-7`}>
      <h3 className="text-center">Create New Project</h3>

      <form onSubmit={submitHandler} className="flex flex-col gap-1 mt-4 text-sm">
        {(file || project?.image) && file !== null ? (
          <div className="relative">
            {/*  eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
            <img src={file ? URL.createObjectURL(file) : project?.image!} className="object-cover mb-3 rounded-lg aspect-video" />
            <button
              onClick={(e) => {
                e.preventDefault()
                console.log('hello world')
                setFile(project?.image ? null : undefined)
              }}
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

          <Button type="submit" isLoading={loading} className="mx-auto mt-8">
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

export default memo(ProjectForm)
