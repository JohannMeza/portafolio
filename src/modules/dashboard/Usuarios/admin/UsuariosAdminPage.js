import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import Icon from '../../../../components/icon/Icon';
import ButtonsFilterComponent from '../../../../components/layout/form/ButtonsFilterComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { ListConstants } from '../../../../util/ListConstants';

const dataInitial = { NOMBRE: "", EMAIL: "", ESTADO: true }

export default function UsuariosAdminPage () {
  const navigate = useNavigate();
  const {setLoader} = useLoaderContext()
  const [data, handleInputFormChange, resetData] = useForm(dataInitial)
  const [usuarios, setUsuarios] = useState([])
  const alert = useAlert()

  const listUsuarios = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 9,
      body: data,
      success: (resp) => {
        setLoader(false)
        setUsuarios(resp.dataList)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    listUsuarios()
  }, [])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Nombre" value={data} onChange={handleInputFormChange} name="NOMBRE" />
              <Controls.InputComponent label="Email" value={data} onChange={handleInputFormChange} name="EMAIL" />
              <Controls.SelectComponent label="Estado" value={data} list={ListConstants.LIST_ESTADOS} onChange={handleInputFormChange} name="ESTADO" />
            </div>
            <ButtonsFilterComponent handleClear={resetData} handleFilter={listUsuarios} />
          </div>
        </Controls.CardComponent>
      </div>
      <div className='margin-base-top-card'>
        <Controls.CardComponent zIndex={1} title={"Usuarios"}>
          <div className='flex gap-2'>
            <Controls.ButtonComponent title="Nuevo" className="color-secondary" onClick={() => navigate("/dashboard/usuarios/nuevo")} />
          </div>
          <div>
            <Controls.TableComponent>
              <thead>
                <tr>
                  <th className='text-left'>Id</th>
                  <th className='text-left'>Nombre</th>
                  <th className='text-left'>Apellido</th>
                  <th className='text-left'>Email</th>
                  <th className='text-left'>Estado</th>
                  <th className='text-center'>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((el, index) => (
                    <tr key={index}>
                      <td className='text-left'>{el.ID_USUARIOS}</td>
                      <td className='text-left'>{el.NOMBRE}</td>
                      <td className='text-left'>{el.APELLIDO}</td>
                      <td className='text-left'>{el.EMAIL}</td>
                      <td className='text-left'>{el.ESTADO ? 'Activo' : 'Inactivo'}</td>
                      <td>
                        <Controls.ButtonIconComponent 
                          title='Editar'
                          onClick={() => navigate("/dashboard/usuarios/" + el.ID_USUARIOS)}
                          icon={<Icon.Edit />}
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Controls.TableComponent>
          </div>
        </Controls.CardComponent>
      </div>
    </div>
  )
}