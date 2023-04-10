import { useCallback, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logotipo.svg";
import Controls from "../../components/Controls";
import Icon from "../../components/icon/Icon";
import { SignInRequestData } from "../../helpers/helpRequestBackend";
import useAuthContext from "../../hooks/useAuthContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import useLoaderContext from "../../hooks/useLoaderContext";
import PathConstants from "../../util/PathConstants";

const dataInitial = { EMAIL: "", PASS: "", REMENBER: false };

export default function SignInPage() {
  const { isAuthenticated, setUser } = useAuthContext();
  const alert = useAlert();

  const validate = (fieldValues = data) => {
    let temp = { ...errors };

    if ("EMAIL" in fieldValues) {
      temp.EMAIL =
        fieldValues.EMAIL === ""
          ? "El campo Email de Estudio es requerido"
          : "";
    }

    if ("PASS" in fieldValues) {
      temp.PASS =
        fieldValues.PASS === "" ? "El campo Contraseña es requerido" : "";
    }

    setErrors({ ...temp });
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const { data, errors, setErrors, handleInputFormChange } = useFormValidation(
    dataInitial,
    true,
    validate
  );
  const [statePass, setStatePass] = useState(false);
  const { setLoader } = useLoaderContext();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const auth = () => {
    SignInRequestData({
      queryId: 33,
      body: { ...data },
      success: (resp) => {
        setLoader(false);
        login(resp.token);
        alert.success(resp.message)
        setUser(resp.dataObject)
        window.location.reload()
      },
      error: (err) => {
        setLoader(false);
        const { message } = err;
        alert.error(message);
      },
    });
  };

  useEffect(() => {
    isAuthenticated && navigate(PathConstants.home_admin)
  }, [])

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="w-[8rem] m-auto object-contain">
            <img className="w-auto" src={Logo} alt="Your Company" />
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Iniciar sesion en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Controls.InputComponent
              value={data.EMAIL}
              onChange={handleInputFormChange}
              error={errors.EMAIL}
              name="EMAIL"
              type="email"
              placeholder="Email o Correo Electrónico"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Controls.InputComponent
              value={data.PASS}
              onChange={handleInputFormChange}
              error={errors.PASS}
              name="PASS"
              placeholder="Contraseña"
              icon={statePass ? <Icon.EyeSlash /> : <Icon.Eye />}
              onClickIcon={() => setStatePass((statePass) => !statePass)}
              type={statePass ? "text" : "password"}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="REMEMBER"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Recordar sesión
            </label>
          </div>

          <Controls.ButtonComponent title="INICIAR SESIÓN" onClick={auth} />
        </div>
      </div>
    </div>
  );
}
