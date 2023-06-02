import { useForm } from 'react-hook-form';
import defaultValues from '../utils/defaultValues';
import { useEffect } from 'react';
import './styles/formUser.css'
import Swal from 'sweetalert2';

const FormUser = ({ createNewUser, updateInfo, updateUserById, setUpdateInfo, setFormClose, formClose }) => {

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    } else {
      reset(defaultValues)
    }

  }, [updateInfo])

  const submit = (data) => {

    if (updateInfo) {
      Swal.fire({
        title: 'Are you sure to update the data of this user?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes, update it'
      }).then((result) => {
        if (result.isConfirmed) {
          updateUserById(updateInfo.id, data)
          setUpdateInfo()
          reset(defaultValues)
          handleExit()
        }
      })
    } else {
      Swal.fire({
        title: 'are you sure to create this user?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes, create it'
      }).then((result) => {
        if (result.isConfirmed) {
          createNewUser(data)
          reset(defaultValues)
          handleExit()
        }
      })
    }
  }


  const handleExit = () => {
    setFormClose(true)
  }

  return (
    <div className={`form-container ${formClose && 'close'}`}>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <h3 className="form__title">{updateInfo ? 'update User Information' : 'Create New User'}</h3>
        <span onClick={handleExit} className='form__exit'>X</span>
        <div className="form__item">
          <label className="form__label" htmlFor="email">Email</label>
          <input className="form__input" {...register('email')} type="email" id="email" required />
        </div>
        
        <div className="form__item">
          <label className="form__label" htmlFor="password"> Password</label>
          
          <input className="form__input" {...register('password')} type="password" id="password" required  />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="first_name">First Name</label>
          <input className="form__input" {...register('first_name')} type="text" id="first_name" required  />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="last_name">Last Name</label>
          <input className="form__input" {...register('last_name')} type="text" id="last_name" required />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="birthday">Birthday</label>
          <input className="form__input" {...register('birthday')} type="date" id="birthday" required />
        </div>
        <button  className="form__btn">{updateInfo ? 'Update' : 'Create'}</button>
      </form >
    </div>
  )
}

export default FormUser