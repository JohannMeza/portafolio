import React from 'react';
import styled from 'styled-components';
import card from "../../../../assets/imagenes/card.png";
import 'quill/dist/quill.snow.css';

export default function PublicacionContent({ publicacion, quillRef }) {
  return (
    <div className='box-base'>
      <h1 className='title-h3-base mb-3'>{publicacion.TITULO}</h1>
      <Publicacion>
        <div>
          <img src={publicacion.PORTADA} alt="" className='w-full h-[350px] object-cover rounded-[10px]' />
          <div className='flex justify-between my-4'>
            <div className='flex gap-4 items-center'>
              <img src={card} alt="" className='w-16 h-16 rounded-full' />
              <div className='flex flex-col justify-center'>
                <span className=''>Publicado por:</span>         
                <span className='text-paragraph-1 font-bold'>Johann Meza Salazar</span>
                <span className='text-paragraph-3 font-bold'>Escritor</span>
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className='flex flex-col text-right font-semibold text-paragraph-3'>
              <span>03 de Febrero, 2023</span>
              <span>Caracas Venezuela</span>
            </div>
          </div>
          <article className="publicacion-base-content" ref={quillRef}></article>
        </div>
        <div>
          <h2 className='title-base mb-3 text-paragraph-1'>Publicaciones Relacionadas</h2>
          <div className='flex flex-col gap-6'>
            <div>
              <div className='flex gap-3'>
                <img src={card} alt="" className='w-32 h-16 rounded-sm' />
                <div>
                  <h3 className='title-base text-paragraph-2'>Publicaciones Relacionadas</h3>
                  <p className='text-paragraph-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className='flex items-center gap-3 mt-2'>
                    <img src={card} alt="" className='w-6 h-6 rounded-full' />
                    <span className='font-Poppins text-paragraph-3 font-bold'>Johann Meza</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex gap-3'>
                <img src={card} alt="" className='w-32 h-16 rounded-sm' />
                <div>
                  <h3 className='title-base text-paragraph-2'>Publicaciones Relacionadas</h3>
                  <p className='text-paragraph-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className='flex items-center gap-3 mt-2'>
                    <img src={card} alt="" className='w-6 h-6 rounded-full' />
                    <span className='font-Poppins text-paragraph-3 font-bold'>Johann Meza</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex gap-3'>
                <img src={card} alt="" className='w-32 h-16 rounded-sm' />
                <div>
                  <h3 className='title-base text-paragraph-2'>Publicaciones Relacionadas</h3>
                  <p className='text-paragraph-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className='flex items-center gap-3 mt-2'>
                    <img src={card} alt="" className='w-6 h-6 rounded-full' />
                    <span className='font-Poppins text-paragraph-3 font-bold'>Johann Meza</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex gap-3'>
                <img src={card} alt="" className='w-32 h-16 rounded-sm' />
                <div>
                  <h3 className='title-base text-paragraph-2'>Publicaciones Relacionadas</h3>
                  <p className='text-paragraph-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className='flex items-center gap-3 mt-2'>
                    <img src={card} alt="" className='w-6 h-6 rounded-full' />
                    <span className='font-Poppins text-paragraph-3 font-bold'>Johann Meza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Publicacion>
    </div>
  )
}

const Publicacion = styled.div`
  display: grid;
  grid-template-columns: 1fr 35%;
  gap: 20px;
`;