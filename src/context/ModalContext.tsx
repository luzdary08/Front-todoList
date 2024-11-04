// ModalContext.tsx
import  { createContext, ReactNode, useContext, useState } from 'react';
import { statusModalType } from '../../types';

interface ModalContextProps {
  // statusModal: boolean;
  openModal: (status:statusModalType) => void;
  closeModal: () => void;
  openModalWithId:(id:string | null,status:statusModalType) => void,
  closeModalWithId:() => void,
  modeModal:statusModalType
  // statusModeModal: 'add' | 'edit' | 'edit',
  id:string|null
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);


export const ModalProvider = ({ children }:{children:ReactNode}) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [id, setid] = useState<null | string> (null)
  const [modeModal, setModeModal] = useState<statusModalType> (null)

  const openModal = (status:statusModalType) => {
    setModeModal(status)
    // setModalOpen(true)
  };
  const closeModal = () => {
    setModeModal(null)
    // setModalOpen(false)
  };
  const openModalWithId = (id:string | null,status:statusModalType) =>{
    // setModalOpen(true)
    setid(id)
    setModeModal(status)
  }
  const closeModalWithId = () =>{
    // setModalOpen(false)
    setid(null)
    setModeModal(null)
  }

  return (
    <ModalContext.Provider value={{ modeModal, openModal, closeModal,openModalWithId,closeModalWithId,id
     }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe usarse dentro de un ModalProvider');
  }
  return context;
};
