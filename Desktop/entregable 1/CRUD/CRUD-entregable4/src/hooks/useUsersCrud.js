import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"

const useUserCrud = () => {

  const [users, setUsers] = useState()
  const url = 'https://angel-crud-node.onrender.com/api/v1/users/'

  //GET
  const getAllUsers = () => {
    axios.get(url)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  //POST
  const createNewUser = data => {
    axios.post(url, data)
      .then(res => {
        getAllUsers()
        Swal.fire(
          'created!',
          'Your file has been created.',
          'success'
        )
      })
      .catch(err => {
        console.log(err),
          Swal.fire(
            'An error has occurred!',
            'the file could not be created',
            'warning'
          )
      }
      )
  }

  //DELETE
  const deleteUserById = id => {
    const urlDelete = `${url}${id}/`
    axios.delete(urlDelete)
      .then(res => getAllUsers(),
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

      )
      .catch(err => {
        console.log(err),
          Swal.fire(
            'An error has occurred!',
            'The selected file could not be deleted.',
            'warning'
          )
      }
      )
  }

  //UPDATE
  const updateUserById = (id, data) => {
    const urlUpdate = `${url}${id}/`
    axios.put(urlUpdate, data)
      .then(res => {
        getAllUsers()
        Swal.fire(
          'updated!',
          'Your file has been updated.',
          'success'
        )

      })
      .catch(err => {
        console.log(err),
        Swal.fire(
          'An error has occurred!',
          'the selected file could not be updated.',
          'warning'
        )
      }
      )
  }

  return { users, getAllUsers, createNewUser, deleteUserById, updateUserById }
}

export default useUserCrud