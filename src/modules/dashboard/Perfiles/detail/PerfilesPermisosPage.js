import React from 'react';
import Controls from '../../../../components/Controls';

export default function PerfilesPermisosPage () {
  return (
    <div>
      <div className='columns-1'>
        <Controls.CardComponent zIndex={10} title={"Administrar Permisos"} isInactiveTitle>
          <div className='flex gap-2'></div>
          <div>
            <Controls.CheckboxComponent />
          </div>
        </Controls.CardComponent>
      </div>
    </div>
  )
}