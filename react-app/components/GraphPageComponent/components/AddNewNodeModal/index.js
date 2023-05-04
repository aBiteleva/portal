import {Button, Input, Modal} from "antd";
import styles from "./styles.module.css"
import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";

const AddNewNodeModal = ({isVisible, onCancel, onOk, state}) => {

    const {reset, control, handleSubmit, register} = useForm({
        label: "",
        color: "",
        parent: "1",
        child: "0"
    });

    useEffect(() => {
        reset({
            label: "",
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
