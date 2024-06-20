export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, roundResults = null) => ({
    type: OPEN_MODAL,
    modal,
    roundResults
})

export const closeModal = () => ({
    type: CLOSE_MODAL
})