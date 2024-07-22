import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField } from '@mui/material'
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { unstable_usePrompt } from 'react-router-dom'
import * as yup from 'yup'
import useYupValidationResolver from '../../hook/useYupValidationResolver'

type RegisterProps = {}

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

interface TimeAtt {
  in: string
  out: string
}

interface CodeTime {
  [key: string]: TimeAtt
}

const employeeRecords = [
  { employeecode: 'EMP001', Time: '08:00 AM', Date: new Date('2024-07-01') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-01') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-01') },

  { employeecode: 'EMP001', Time: '08:10 AM', Date: new Date('2024-07-02') },
  { employeecode: 'EMP001', Time: '05:10 PM', Date: new Date('2024-07-02') },

  { employeecode: 'EMP001', Time: '08:05 AM', Date: new Date('2024-07-03') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-03') },

  { employeecode: 'EMP001', Time: '08:00 AM', Date: new Date('2024-07-04') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-04') },

  { employeecode: 'EMP001', Time: '08:15 AM', Date: new Date('2024-07-05') },
  { employeecode: 'EMP001', Time: '05:10 PM', Date: new Date('2024-07-05') },

  { employeecode: 'EMP001', Time: '08:00 AM', Date: new Date('2024-07-06') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-06') },

  { employeecode: 'EMP001', Time: '08:10 AM', Date: new Date('2024-07-07') },
  { employeecode: 'EMP001', Time: '05:05 PM', Date: new Date('2024-07-07') },

  { employeecode: 'EMP001', Time: '08:05 AM', Date: new Date('2024-07-08') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-08') },

  { employeecode: 'EMP001', Time: '08:00 AM', Date: new Date('2024-07-09') },
  { employeecode: 'EMP001', Time: '05:00 PM', Date: new Date('2024-07-09') },

  { employeecode: 'EMP001', Time: '08:15 AM', Date: new Date('2024-07-10') },
  { employeecode: 'EMP001', Time: '05:10 PM', Date: new Date('2024-07-10') }
]
const RegisterPage: FC<RegisterProps> = () => {
  const defaultValues: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const recordBreakTime = true
  const a = employeeRecords.reduce((acc: { [key: string]: { in?: string; inBreak?: string; outbreak?: string; out?: string } }, curr) => {
    const date = String(curr.Date)

    if (!acc[date]) {
      acc[date] = { in: curr.Time }
      return acc
    } else if (acc[date].in && recordBreakTime) {
      acc[date].inBreak = curr.Time

      return acc
    } else if (acc[date].in && acc[date].inBreak) {
      acc[date].outbreak = curr.Time
      return acc
    }
    if (acc[date].out) {
      acc[date].out = curr.Time
      return acc
    } else {
      acc[date].out = curr.Time
      return acc
    }
  }, {})


  const validateSchema = yup.object().shape({
    firstName: yup.string().required().trim().min(1),
    lastName: yup.string().required().trim().min(1),
    email: yup.string().email('valid').required().trim(),
    password: yup.string().min(3).max(15).trim(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), 'samePassword'])
      .required()
  })
  const resolver = useYupValidationResolver(validateSchema)
  const registerForm = useForm<RegisterForm>({ defaultValues: defaultValues, resolver: resolver, reValidateMode: 'onSubmit' })

  const {
    watch,
    reset,
    handleSubmit,
    control,
    formState: { errors, isDirty }
  } = registerForm

  const onSubmit = async (value: RegisterForm) => {
    event?.preventDefault()
    reset({ firstName: 'bill' })
  }

  const firstName = watch('firstName')

  unstable_usePrompt({ when: isDirty, message: 'are you sure???' })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='firstName'
        render={({ field }) => {
          return <TextField {...field} error={!!errors.firstName?.message} helperText={errors.firstName?.message} />
        }}
      />
      <Box>{firstName}</Box>
      <Controller
        control={control}
        name='lastName'
        render={({ field }) => <TextField {...field} error={!!errors.lastName?.message} helperText={errors.lastName?.message} />}
      />
      <Controller
        control={control}
        name='email'
        render={({ field }) => <TextField {...field} error={!!errors.email?.message} helperText={errors.email?.message} />}
      />
      <Controller
        control={control}
        name='password'
        render={({ field }) => (
          <TextField {...field} type='password' error={!!errors.password?.message} helperText={errors.password?.message} />
        )}
      />
      <Controller
        control={control}
        name='confirmPassword'
        render={({ field }) => (
          <TextField {...field} type='password' error={!!errors.confirmPassword?.message} helperText={errors.confirmPassword?.message} />
        )}
      />

      <button type='submit'>submit</button>
    </form>
  )
}

export default RegisterPage
