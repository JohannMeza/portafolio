import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { useParams } from 'react-router-dom';
import FooterComponent from '../../../../components/layout/footer/FooterComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import PublicacionBanner from '../detail/PublicacionBanner';
import PublicacionContent from '../detail/PublicacionContent';

export default function PublicacionPage() {
  const { setLoader } = useLoaderContext();
  const [publicacion, setPublicacion] = useState({});
  const { id } = useParams();
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: { toolbar: false }
  })

  const getPublicacion = () => {
    SaveRequestData({
      queryId: 36,
      body: { id_publicaciones: id },
      success: (resp) => {
        setLoader(false);
        setPublicacion(resp.dataObject)
        quill.setContents(JSON.parse(resp.dataObject.PUBLICACION))
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  }

  const getPublicacionesRelacionadas = () => {
    SaveRequestData({
      queryId: 36,
      body: { id_publicaciones: id },
      success: (resp) => {
        setLoader(false);
        setPublicacion(resp.dataObject)
        quill.setContents(JSON.parse(resp.dataObject.PUBLICACION))
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  }
  
  useEffect(() => {
    (id && quill) && getPublicacion()
    getPublicacionesRelacionadas()
    window.scroll({top: 0});
  }, [id, quill])

  return (
    <div>
      <PublicacionBanner title={publicacion.TITULO} />
      <br />
      <PublicacionContent publicacion={publicacion} quillRef={quillRef} />
      <br />
      <FooterComponent />
    </div>
  )
}