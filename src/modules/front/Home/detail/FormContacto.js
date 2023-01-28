import React from 'react';
import Controls from "../../../../components/Controls";
import { useFormValidation } from '../../../../hooks/useFormValidation';

const dataInitial = { NOMBRE: "", EMAIL: "", MENSAJE: "" }

export default function FormContacto () {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NOMBRE" in fieldValues) {
      temp.NOMBRE = fieldValues.NOMBRE === "" ? "El campo Nombre de Estudio es requerido" : "";
    } 

    if ("EMAIL" in fieldValues) {
      temp.EMAIL = fieldValues.EMAIL === "" ? "El campo Email es requerido" : "";
    } 

    if ("MENSAJE" in fieldValues) {
      temp.MENSAJE = fieldValues.MENSAJE === "" ? "El campo Mensaje es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const {data, setData, handleInputFormChange, errors, setErrors} = useFormValidation(dataInitial, true, validate)
  
  return (
    <div className="box-base">
        <section className="text-gray-600 body-font">
          <div className="container">
            <div className="flex flex-col items-center">
              <h2 className="text-center text-title-3 font-Poppins font-semibold text-secondary">
                Valores
              </h2>
              <h3 className="text-center text-title-2 font-Poppins font-semibold text-primary">
                Mis valores diferenciales
              </h3>
              <p className="text-center w-2/4 font-OpenSans font-normal text-paragraph-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
                facilis et laborum provident quas explicabo aperiam omnis sequi
                voluptate ut iusto, quia distinctio dolorum natus perferendis
                odit aliquid minima enim.
              </p>
            </div>

            <br />

            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-3 w-2/4">
                <Controls.InputComponent
                  label="Nombre"
                  value={data.NOMBRE}
                  placeholder="Ingresa tu nombre"
                  onChange={handleInputFormChange}
                  name="NOMBRE"
                  error={errors.NOMBRE}
                  />
                <Controls.InputComponent
                  label="Email"
                  name="EMAIL"
                  value={data.EMAIL}
                  onChange={handleInputFormChange}
                  placeholder="Ingresa tu correo tu electrónico"
                  error={errors.EMAIL}
                  />
                <Controls.InputComponent
                  label="Mensaje"
                  name="MENSAJE"
                  value={data.MENSAJE}
                  onChange={handleInputFormChange}
                  placeholder="Ingresa tu mensaje"
                  error={errors.MENSAJE}
                  textarea
                />
                <Controls.ButtonComponent
                  title="ENVIAR"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}