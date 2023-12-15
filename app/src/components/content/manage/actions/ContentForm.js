import ModalControlled from "../../../tools/ModalControlled"
import MakeForm from "../../../tools/makeform/MakeForm"



export default function ContentForm({ inputs, formOptions, setFormOptions, trigger }) {

    // for get values and pass to modal
    const handleSubmit = (values, props) => {
        setFormOptions({
            ...formOptions, values, isShowModal: true
        })
    }

    return (
        <>
            <MakeForm inputs={inputs} onSubmit={handleSubmit} formOptions={formOptions} setFormOptions={setFormOptions} />

            {/* ###### modal ###### */}
            {formOptions.isShowModal && <ModalControlled
                title="confirm action" description="r u sure ?"
                action={trigger}
                isShowModal={formOptions?.isShowModal}
                setFormOptions={setFormOptions}
                close={() => setFormOptions({ ...formOptions, isShowModal: false })} />}
        </>
    )
}
