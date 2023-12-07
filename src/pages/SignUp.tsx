import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";


const SignUp = () => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white h-16">
                      {t('app-title')}
                  </h3>
                  <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                          <input type="email" value={login} onChange={e => setLogin(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('email-input')}/>
                      </div>
                      <div>
                          <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder={t('name-placeholder')} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <div>
                          <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder={t('surname-placeholder')} name="surname" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <div>
                          <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder={t('patronomyc-placeholder')} name="patronomyc" id="patronomyc" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <CustomSelect titleKg="Факультет" titleTr="Fakulte" data={[{id: 1, textKg: "Гуманитардык", textTr: "Insani"}, {id: 2, textKg: "Экономика", textTr: "Ekonomi"}, {id: 3, textKg: "Инженерия", textTr: "Mühendislik"}]}/>
                      <CustomSelect titleKg="Болум" titleTr="Bolum" data={[{id: 1, textKg: "Компьютердик", textTr: "Bilgisayar"}, {id: 2, textKg: "Экология", textTr: "Cevre"}, {id: 3, textKg: "Химия", textTr: "Kimya"}]}/>
                      <div>
                          <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder={t('phoneNumber-placeholder')} name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <div>
                          <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder={t('password')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <div>
                          <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="confirmPassword" id="confirmPassword" placeholder={t('confirmPassword')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      {t('sign-up')}
                      </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      {t('exists-account')} <a onClick={() => navigate("/")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t('sign-in')}</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default SignUp;