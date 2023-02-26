import {Button, Input, Modal, Select} from "antd";
import styles from "./styles.module.css"
import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";

const {Option} = Select;

const typeOptions = [
    {value: 'event', label: "Событие"},
    {value: 'action', label: "Правило"},
    {value: 'without', label: "Без типа"},
];

const shapeOptions = [
    {value: 'circle', label: "Круг"},
    {value: 'box', label: "Прямоугольник"},
    {value: 'triangle', label: "Треугольник"},
    {value: 'star', label: "Звезда"},
    {value: 'dimond', label: "Ромб"},
    {value: 'image', label: "Картинка"}
]

const AddNewNodeModal = ({isVisible, onCancel, onOk, state}) => {

    const {reset, control, handleSubmit, register, watch} = useForm({
        label: "",
        type: "",
        shape: "",
        image: "",
        color: "",
        parent: "1",
        child: "0"
    });

    useEffect(() => {
        reset({
            label: "",
            type: "",
            shape: "",
            image: "",
            color: "",
            parent: "1",
            child: "0"
        })
    }, [state])

    return <Modal title="Добавление новой ноды" open={isVisible} onCancel={onCancel} footer={false}>
        <form onSubmit={handleSubmit(onOk)} className={styles.formModal}>
            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Лейбл</div>
                <Controller
                    render={({field}) =>
                        <Input
                            {...register("label", {
                                required: 'Введите лейбл'
                            })}
                            {...field}/>}
                    name="label"
                    control={control}
                    defaultValue=''
                />
            </div>

            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Тип</div>
                <Controller
                    render={({field}) =>
                        <Select
                            {...register("type", {
                                required: 'Выберите тип'
                            })}
                            className={styles.formItemSelect}
                            {...field}>
                            {typeOptions.map(option => <Option value={option.value}>{option.label}</Option>)}
                        </Select>}
                    name="type"
                    control={control}
                    defaultValue='event'
                />
            </div>

            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Форма</div>
                <Controller
                    render={({field}) =>
                        <Select
                            {...register("shape", {
                                required: 'Выберите форму'
                            })}
                            className={styles.formItemSelect}
                            {...field}
                        >
                            {shapeOptions.map(option => <Option value={option.value}>{option.label}</Option>)}
                        </Select>}
                    name="shape"
                    control={control}
                    defaultValue='box'
                />
            </div>

            {watch('shape') === 'image' && <div className={styles.formItem}>
                <div className={styles.formItemTittle}>URL картинки</div>
                <Controller
                    render={({field}) =>
                        <Input
                            {...register("image", {
                                required: 'Введите URL картинки',
                            })}
                            {...field}
                        />}
                    name="image"
                    control={control}
                    defaultValue=''
                />
            </div>}

            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Цвет</div>
                <Controller
                    render={({field}) =>
                        <Input
                            {...register("color", {
                                required: 'Введите ',
                                minLength: {
                                    value: 7,
                                    message: 'Введите цвет в формате HEX начиная с # ',
                                },
                                maxLength: {
                                    value: 7,
                                    message: 'ОВведите цвет в формате HEX начиная с # ',
                                },
                            })}
                            {...field}/>}
                    name="color"
                    control={control}
                    defaultValue=''
                />
            </div>

            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Родитель</div>
                <Controller
                    render={({field}) =>
                        <Input
                            {...register("parent", {
                                required: 'Введите номер родителя',
                            })}
                            {...field}
                        />}
                    name="parent"
                    control={control}
                    defaultValue=''
                />
            </div>

            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Ребенок</div>
                <Controller
                    render={({field}) =>
                        <Input {...field}/>}
                    name="child"
                    control={control}
                    defaultValue=''
                />
            </div>

            <div className={styles.footer}>
                <Button type="primary" htmlType="submit">
                    Создать
                </Button>
            </div>
        </form>
    </Modal>
}

export default AddNewNodeModal;
