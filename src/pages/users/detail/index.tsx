import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { fakeUsers } from "src/assets/fake-users"
import { CustomSelect } from "src/components"
import { CustomAppShell } from "src/ui-kits"

type errorsType = {
    id?: number;
    fullnameKg?: string;
    fullnameTr?: string;
    age?: number;
    facultyKg?: string;
    facultyTr?: string;
    departamentKg?: string;
    departamentTr?: string;
    email?: string;
    phoneNumber?: string;
    patronomycKg?: string;
    patronomycTr?: string;
};

export const UserDetail = ({ id }: { id?: number }) => {
    const { t } = useTranslation()
    const { userId } = useParams()
    const user: UserResponse = fakeUsers.find(el => el.id === (id || userId)) || {}
    const [form, setForm] = useState<UserForm>()
    const [errors, setErrors] = useState<errorsType>({});

    const validateForm = () => {
        const newErrors: errorsType = {};
        // Add validation logic here
        if (!form?.email) {
            newErrors.email = t('email-required');
        }
        if (!form?.fullnameKg) {
            newErrors.fullnameKg = t('fullname-required');
        }
        if (!form?.fullnameTr) {
            newErrors.fullnameTr = t('fullname-required');
        }
        if (!form?.patronomycKg) {
            newErrors.patronomycKg = t('patronomyc-required');
        }
        if (!form?.patronomycTr) {
            newErrors.patronomycTr = t('patronomyc-required');
        }
        if (!form?.phoneNumber) {
            newErrors.phoneNumber = t('phoneNumber-required');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSave = () => {
        validateForm()
    }

    useEffect(() => {
        setForm({
            fullnameKg: user?.fullname?.titleKg,
            fullnameTr: user?.fullname?.titleTr,
            age: user?.age,
            facultyId: user?.facultyId,
            departamentId: user?.facultyId,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            patronomycKg: user?.patronomyc?.titleKg,
            patronomycTr: user?.patronomyc?.titleTr,
        })
    }, [])
    return (
        <CustomAppShell>
            <div className="w-4/6 h-4/6">
                <form onSubmit={handleSave} className="flex gap-4">
                    <div className="relative">
                        <p className="absolute text-sm -top-5 text-red-600">
                            {errors?.email}
                        </p>
                        <input
                            type="email"
                            value={form?.email}
                            autoComplete="on"
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, email: e.target.value }))
                            }
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t('email-input')}
                        />
                    </div>
                    <div className="relative">
                        <p className="absolute text-sm -top-5 text-gray-700 dark:text-gray-200">
                            {t('fullname-kg-placeholder')}
                        </p>
                        <input
                            type="text"
                            value={form?.fullnameKg}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, name: e.target.value }))
                            }
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <p className="absolute text-sm -top-5 text-red-600">
                            {errors.fullnameTr}
                        </p>
                        <input
                            type="text"
                            value={form?.fullnameTr}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, name: e.target.value }))
                            }
                            placeholder={t('fullname-tr-placeholder')}
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <p className="absolute text-sm -top-5 text-red-600">
                            {errors.age}
                        </p>
                        <input
                            type="text"
                            value={form?.age}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    patronomyc: e.target.value,
                                }))
                            }
                            placeholder={t('patronomyc-placeholder')}
                            name="patronomyc"
                            id="patronomyc"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* <div className="relative">
                    <p className="absolute text-sm -top-5 text-red-600">
                        {errors.facultyKg}
                    </p>
                    <CustomSelect
                        value={form?.faculty || ""}
                        onChange={(el: string) =>
                            setForm((prev) => ({ ...prev, faculty: el }))
                        }
                        defaultValue={{ titleKg: 'Факультет', titleTr: 'Fakulte' }}
                        data={[
                            { id: 1, titleKg: 'Гуманитардык', titleTr: 'Insani' },
                            { id: 2, titleKg: 'Экономика', titleTr: 'Ekonomi' },
                            { id: 3, titleKg: 'Инженерия', titleTr: 'Mühendislik' },
                        ]}
                    />
                </div> */}
                    {/* <div className="relative">
                    <p className="absolute text-sm -top-5 text-red-600">
                        {errors?.department}
                    </p>
                    <CustomSelect
                        onChange={(el: string) =>
                            setForm((prev) => ({ ...prev, department: el }))
                        }
                        value={form?.department}
                        defaultValue={{ titleKg: 'Болум', titleTr: 'Bolum' }}
                        data={[
                            { id: 1, titleKg: 'Компьютердик', titleTr: 'Bilgisayar' },
                            { id: 2, titleKg: 'Экология', titleTr: 'Cevre' },
                            { id: 3, titleKg: 'Химия', titleTr: 'Kimya' },
                        ]}
                    />
                </div> */}

                    <div className="relative">
                        <p className="absolute text-sm -top-5 text-red-600">
                            {errors.phoneNumber}
                        </p>
                        <input
                            type="text"
                            value={form?.phoneNumber}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    phoneNumber: e.target.value,
                                }))
                            }
                            placeholder={t('phoneNumber-placeholder')}
                            name="phoneNumber"
                            id="phoneNumber"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </form>
            </div>

        </CustomAppShell>
    )
}
