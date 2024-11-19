import { memo, useState } from 'react'
import { GoXCircle } from 'react-icons/go'
import { FC } from 'react'
import { transparentClasses } from '../utils'
import Dropzone from 'react-dropzone'
import Input from './UI/Form/Input/Input'
import TextArea from './UI/Form/TextArea'
import useForm from '../hooks/useForm'
import { ProjectCreateDTO, projectCreateSchema } from '../validators/project/projectCreate.validator'
import Button from './UI/Button'
import { Store, useAppStore } from '../state/store'

interface CreateProjectFormProps {
  onClose: () => void
}

const selectors = (state: Store) => ({
  loading: state.project.creating,
  create: state.project.create,
})

const CreateProjectForm: FC<CreateProjectFormProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | undefined>(undefined)

  const { loading, create } = useAppStore(selectors)

  const handleSubmit = async (data: ProjectCreateDTO) => {
    await create(data, file)
    onClose()
  }

  const { control, submitHandler } = useForm(projectCreateSchema, handleSubmit, {
    title: '',
    description: '',
  })

  return (
    <div className={`relative p-4 w-full rounded-lg text-secondary-12 ${transparentClasses}`}>
      <h3 className="text-center">Create New Project</h3>

      <form onSubmit={submitHandler} className="flex flex-col gap-1 mt-4 text-sm">
        {file ? (
          <div className="relative">
            <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover mb-3 rounded-lg aspect-video" />

            <button onClick={() => setFile(undefined)} className={`absolute -top-3 -right-3 rounded-full text-secondary-12 ${transparentClasses}`}>
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

      <button onClick={onClose} className={`absolute -top-3 -right-3 rounded-full text-secondary-12 bg-primary-3`}>
        <GoXCircle className="w-6 h-6" />
      </button>
    </div>
  )
}

export default memo(CreateProjectForm)
