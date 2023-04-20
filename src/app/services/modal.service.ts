import {Injectable} from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: IModal[] = [];

  constructor() {
  }

  register(id: string) {
    this.modals.push({
      id, visible: false
    });
  }

  unregister(id: string) {
    this.modals = this.modals.filter(elements => elements.id !== id);
  }

  isModalVisible(id: string): boolean {
    return !!this.modals.find(elements => elements.id === id)?.visible;    // type negation is used to avoid undefined error
  }

  toggleModal(id: string) {
    const modal = this.modals.find(elements => elements.id === id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }

}
