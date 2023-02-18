import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Controls from '../../../../components/Controls';
import Icon from '../../../../components/icon/Icon';
import ButtonsFilterComponent from '../../../../components/layout/form/ButtonsFilterComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { ListConstants } from '../../../../util/ListConstants';
import PathConstants from '../../../../util/PathConstants';

const dataInitial = { NOMBRE: "", APELLIDO: "", ESTADO: true }

export default function PublicacionesAdminPage() {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [data, handleInputChange, resetData] = useForm(dataInitial)
  const {setLoader} = useLoaderContext();

  const getPublicaciones = () => {
    SaveRequestData({
      queryId: 9,
      body: data,
      success: (resp) => {
        setLoader(false)
        console.log(resp)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }  

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className="flex gap-2"></div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              <Controls.InputComponent
                label="Nombre"
                value={data}
                name="PERFIL"
                onChange={handleInputChange}
              />
              <Controls.SelectComponent
                list={ListConstants.LIST_ESTADOS}
                name="ESTADO"
                value={data}
                label="Estado"
                onChange={handleInputChange}
              />
            </div>
            <ButtonsFilterComponent
              handleClear={resetData}
              handleFilter={getPublicaciones}
            />
          </div>
        </Controls.CardComponent>
      </div>
      <div className="margin-base-top-card">
        <Controls.CardComponent zIndex={1} title={"Administracion de Publicaciones"}>
          <div className="flex gap-2">
            <Controls.ButtonComponent
              title="Nuevo"
              className="color-secondary"
              onClick={() => navigate(PathConstants.publicaciones_nuevo)}
            />
          </div>
          <div>
            <Controls.TableComponent>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Autor</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {publicaciones.map((el, index) => (
                  <tr key={index}>
                    <td>{el.id_perfiles}</td>
                    <td>{el.perfil}</td>
                    <td>{el.estado ? "Activo" : "Inactivo"}</td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <Controls.ButtonIconComponent
                          title="Editar"
                          icon={<Icon.Edit />}
                          onClick={() =>
                            navigate(`${PathConstants.publicaciones_detail}${el.id_perfiles}`)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Controls.TableComponent>
          </div>
        </Controls.CardComponent>
      </div>
    </div>
  )
}