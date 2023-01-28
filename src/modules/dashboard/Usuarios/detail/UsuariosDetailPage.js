import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Controls from "../../../../components/Controls";
import Icon from "../../../../components/icon/Icon";
import ButtonsSaveComponent from "../../../../components/layout/form/ButtonsSaveComponent";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { ListConstants } from "../../../../util/ListConstants";
const dataInitial = { NOMBRE: "", APELLIDO: "", EMAIL: "", PASSWORD: "", ESTADO: true, ID_PERFILES: null };

export default function UsuariosDetailPage() {
  const [statePass, setStatePass] = useState(false)
  const validate = (fieldValues = data) => {
    let temp = { ...errors };

    if ("NOMBRE" in fieldValues) temp.NOMBRE = !fieldValues.NOMBRE ? "El campo Nombre es requerido" : "";
    if ("APELLIDO" in fieldValues) temp.APELLIDO = !fieldValues.APELLIDO ? "El campo APELLIDO es requerido" : "";
    if ("EMAIL" in fieldValues) temp.EMAIL = !fieldValues.EMAIL ? "El campo Email es requerido" : "";
    if ("PASSWORD" in fieldValues) temp.PASSWORD = !fieldValues.PASSWORD ? "El campo Contraseña es requerido" : "";
    if ("ESTADO" in fieldValues) temp.ESTADO = fieldValues.ESTADO === null ? "El campo Contraseña es requerido" : "";

    setErrors({ ...temp });
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {data, setData, errors, setErrors, handleInputFormChange, resetForm} = useFormValidation(dataInitial, true, validate);
  const [perfiles, setPerfiles] = useState([])
  const {setLoader} = useLoaderContext();
  const navigate = useNavigate();
  const alert = useAlert();
  const {id} = useParams();

  const saveUsuario = () => {
    if (validate()) {
      setLoader(true)
      SaveRequestData({
        queryId: 8,
        body: {...data, ID_USUARIO: id},
        success: (resp) => {
          setLoader(false)
          alert.success(resp.message)
          navigate("/dashboard/usuarios/admin")
        }, 
        error: (err) => {
         setLoader(false)
         const { message } = err;
         alert.error(message)
       }
     })
    }
  }

  const searchUsuario = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 10,
      body: {ID_USUARIO: id}, 
      success: (resp) => {
        setLoader(false)
        setData(resp.dataObject)
      }, 
      error: (err) => {
        setLoader(false)
        const { message } = err;
        alert.error(message)
      }
    })
  }

  const listPerfiles = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 11,
      success: (resp) => {
        setLoader(false)
        setPerfiles([ListConstants.LIST_VACIO, ...resp.dataList])
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    listPerfiles()
    if (id) searchUsuario()
  }, [])

  return (
    <div className="columns-1 margin-base-top-card">
      <Controls.CardComponent title={"Nuevo"}>
        <div className="flex gap-2"></div>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <Controls.SelectComponent
              label="Perfiles"
              list={perfiles}
              value={data}
              name="ID_PERFILES"
              error={errors}
              onChange={handleInputFormChange}
            />
            <Controls.InputComponent
              label="Nombre"
              name="NOMBRE"
              value={data}
              onChange={handleInputFormChange}
              error={errors}
            />
            <Controls.InputComponent
              label="Apellido"
              name="APELLIDO"
              value={data}
              onChange={handleInputFormChange}
              error={errors}
            />
            <Controls.InputComponent
              label="Email"
              name="EMAIL"
              value={data}
              autocomplete="off"
              onChange={handleInputFormChange}
              error={errors}
              />
            <Controls.InputComponent
              label="Contraseña"
              name="PASSWORD"
              value={data}
              onChange={handleInputFormChange}
              autocomplete="off"
              error={errors}
              icon={statePass ? <Icon.EyeSlash /> : <Icon.Eye />}
              onClickIcon={() => setStatePass((statePass) => !statePass)}
              type={statePass ? "text" : "password"}
              />
            <Controls.SelectComponent 
              label="Estado"
              list={ListConstants.LIST_ESTADOS}
              value={data}
              name="ESTADO"
              error={errors}
              onChange={handleInputFormChange}
            />
          </div>
        </div>
      </Controls.CardComponent>

      <ButtonsSaveComponent handleBack={() => navigate("/dashboard/usuarios/admin")} handleAction={saveUsuario} />
    </div>
  );
}
