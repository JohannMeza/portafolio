import React from "react";
import Controls from "../../../../components/Controls";

import FooterComponent from "../../../../components/layout/footer/FooterComponent";

import Banner from "../detail/Banner";
import CardsComponent from "../detail/CardsCantidad";
import FormContacto from "../detail/FormContacto";
import Proyectos from "../detail/Proyectos";
import Tecnologias from "../detail/Tecnologias";
import Valores from "../detail/Valores";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <CardsComponent />
      <Valores />
      <Controls.BoxSpace />
      <Tecnologias />
      <Controls.BoxSpace />
      <Proyectos />
      <Controls.BoxSpace />
      <FormContacto />
      <Controls.BoxSpace />
      <FooterComponent />
    </div>
  );
}
