import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/Slice/modalSlice";
import { Modal } from "antd";

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { open, modalContent, headerContent, width } = useSelector(
    (state) => state.modalSlice.modalProps
  );
  const onCancel = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      title={headerContent || "Modal"}
      centered
      closable={true}
      open={open}
      onOk={() => {
        console.log("Ok");
      }}
      onCancel={onCancel}
      width={width}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {modalContent}
    </Modal>
  );
};

export default ModalComponent;
