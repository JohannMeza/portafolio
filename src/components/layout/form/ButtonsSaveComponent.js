import React from 'react';
import { useParams } from 'react-router-dom';
import Controls from '../../Controls';

export default function ButtonsSaveComponent ({ handleBack, handleAction, titleAction = false }) {
  const { id } = useParams();
  
  return (
    <div className='flex gap-4 justify-center mt-4'>
      <Controls.ButtonComponent title="Volver" className="color-secondary" onClick={handleBack} />
      <Controls.ButtonComponent title={titleAction ? titleAction : id ? "Actualizar" : "Guardar"} className="color-primary" onClick={handleAction} />
    </div>
  )
}