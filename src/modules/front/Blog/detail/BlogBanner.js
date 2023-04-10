import React, {useState, useEffect} from "react";
import { Fade } from "react-awesome-reveal";
import styled from "styled-components";
import { SaveRequestData, SendRequestData } from "../../../../helpers/helpRequestBackend";
import FrontCardComponent from "../../../../components/card/FrontcardComponent";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { useNavigate } from "react-router-dom";

export default function BlogBanner() {
  const { setLoader } = useLoaderContext();
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const getLastPublicaciones = () => {
    SendRequestData({
      queryId: 37,
      body: {id_categorias: 1},
      success: (resp) => {
        setLoader(false);
        setCategorias(resp.dataList)
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  }

  useEffect(() => {
    getLastPublicaciones()
  }, [])
  
  return (
    <Banner>
      <div>
        <h1 className="text-title-1 text-white font-Poppins font-semibold">
          Destacado de la semana
        </h1>
      </div>

      <Publicaciones className="box-base absolute bottom-20 translate-y-full">
        <Fade direction="up" triggerOnce>
          {categorias.map((el, index) => (
            <FrontCardComponent
              key={index}
              className="hover:-translate-y-6 transition-transform m-auto"
              title={el.titulo}
              descripcionCorta={el.descripcion_corta}
              image={el.portada}
              navigate={() => navigate(`/blog/destacado/${el.id_publicaciones}`)}
            />
          ))}
        </Fade>
      </Publicaciones>
    </Banner>
  );
}

const Publicaciones = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
`;

const Banner = styled.div`
  min-height: 50vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(136, 1, 111, 0.9) 0%,
    rgba(22, 15, 111, 0.9) 100%
  );
`;
