import {Button, Input, Modal} from "antd";
import styles from "./styles.module.css"
import {useForm, Controller} from "react-hook-form";
import {useEffect} from "react";

const EditNodeModal = ({isVisible, onCancel, onEdit, node}) => {

    const {reset, control, handleSubmit} = useForm();

    useEffect(() => {
        reset({
            label: node?.label,
            color: node?.color
        })

    }, [node])


    return <Modal title="Редактирование ноды" open={isVisible} onCancel={onCancel} footer={false}>
        <form onSubmit={handleSubmit(onEdit)}>
            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Лейбл</div>
                <Controller
                    render={({field}) => <Input {...field}/>}
                    name="label"
                    control={control}
                    rules={{required: true}}
                    defaultValue={node?.label}
                />
            </div>
            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Цвет</div>
                <Controller
                    render={({field}) => <Input {...field}/>}
                    name="color"
                    control={control}
                    defaultValue={node?.color}
                />
            </div>

            <div className={styles.footer}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    </Modal>
}

export default EditNodeModal;
