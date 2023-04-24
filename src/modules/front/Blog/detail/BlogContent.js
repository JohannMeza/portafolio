import React from "react";
import FrontCardComponent from "../../../../components/card/FrontcardComponent";
import { useEffect } from "react";
import { SaveRequestData, SendRequestData } from "../../../../helpers/helpRequestBackend";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../../util/PathConstants";

export default function BlogContent() {
  const {setLoader} = useLoaderContext();
  const [categorias, setCategorias] = useState([])
  const navigate = useNavigate();

  const getPublicaciones = () => {
    SendRequestData({
      queryId: 34,
      body: {id_categorias: 1},
      success: (resp) => {
        setLoader(false);
        setCategorias(resp.dataList || [])
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  };

  useEffect(() => {
    getPublicaciones();
  }, []);

  return (
    <div className="box-base mt-[420px]">
      {
        categorias.map((el, index) => (
          el.publicaciones.length > 0 &&
          <div className="mt-12" key={index}>
            <h1 className="font-Poppins text-title-2 font-semibold mb-6">{el.categoria}</h1>
            <Publicaciones>
              {el.publicaciones.map((publicacion, index) => (
                <Fade direction="up" triggerOnce key={index}>
                  <FrontCardComponent
                    className="hover:-translate-y-6 transition-transform m-auto"
                    title={publicacion.titulo}
                    descripcionCorta={publicacion.descripcion_corta}
                    image={publicacion.portada}
                    navigate={() => navigate(`${PathConstants.blog_publicacion}${el.categoria}/${publicacion.id_publicaciones}`)}
                  />
                </Fade>
              ))}
            </Publicaciones>
          </div>
        ))
      }
    </div>
  );
}

const Publicaciones = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
`;