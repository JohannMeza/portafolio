import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import Icon from '../../../../components/icon/Icon';
import ButtonsFilterComponent from '../../../../components/layout/form/ButtonsFilterComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { classNames } from '../../../../util/ClassNames';
import { ListConstants } from '../../../../util/ListConstants';

const dataInitial = { CATEGORIAS: "", ESTADO: true }
export default function CategoriasAdminPage() {
  const [categorias, setCategorias] = useState([])
  const [data, handleInputChange, resetData] = useForm(dataInitial)
  const navigate = useNavigate();
  const {setLoader} = useLoaderContext()

  const listCategorias = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 23,
      body: data,
      success: (resp) => {
        setLoader(false)
        console.log(resp)
        setCategorias(resp.dataList)
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    listCategorias()
  }, [])
  
  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Categorias" name="CATEGORIAS" value={data} onChange={handleInputChange} />
              <Controls.SelectComponent label="Estado" name="ESTADO" value={data} list={ListConstants.LIST_ESTADOS} onChange={handleInputChange} />
            </div>
            <div>
              <ButtonsFilterComponent handleClear={resetData} handleFilter={listCategorias} />
            </div>
          </div>
        </Controls.CardComponent>
      </div>
      <div className='margin-base-top-card'>
        <Controls.CardComponent zIndex={1} title={"Categorias"}>
          <div className='flex gap-2'>
            <Controls.ButtonComponent title="Nuevo" className="color-secondary" onClick={() => navigate("/dashboard/categorias/nuevo")} />
          </div>
          <div>
            <Controls.TableComponent>
              <thead>
                <tr>
                  <th className='text-left'>Id</th>
                  <th className='text-left'>Categorias</th>
                  <th className='text-left'>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  categorias.map((el, index) => (
                    <tr key={index}>
                      <td className='text-left'>{el.id_categorias}</td>
                      <td className='text-left'>{el.categoria}</td>
                      <td className='text-left'>{el.estado ? 'Activo' : 'Inactivo'}</td>
                      <td>
                        <Controls.ButtonIconComponent 
                          title="Editar"
                          onClick={() => navigate("/dashboard/categorias/" + el.id_categorias)}
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