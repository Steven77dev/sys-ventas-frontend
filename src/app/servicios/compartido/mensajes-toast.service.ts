import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
  })
export class MensajesToastService{

    constructor(private messageService: MessageService) { }
    showSuccess(summary: string,  details: string) {
        this.messageService.add({severity:'success', summary: summary, detail: details});
    }
    
    showInfo(summary: string,  details: string) {
        this.messageService.add({severity:'info', summary: summary, detail: details});
    }
    
    showWarn(summary: string,  details: string) {
        this.messageService.add({severity:'warn', summary: summary, detail: details});
    }
    
    showError(summary: string,  details: string) {
        this.messageService.add({severity:'error', summary: summary, detail: details});
    }

    
    
    showCustom(summary: string,  details: string, icon: string) {
        this.messageService.add({severity:'custom', summary: summary, detail: details, icon: icon});
    }
    
    showTopLeft() {
        this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
    }
    
    showTopCenter() {
        this.messageService.add({key: 'tc', severity:'warn', summary: 'Warn', detail: 'Message Content'});
    }
    
    showBottomCenter() {
        this.messageService.add({key: 'bc', severity:'success', summary: 'Success', detail: 'Message Content'});
    }
    
    showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
    }

    errorServicio(message: string, errorResponse: any) {
        this.showError('Error', message)
      }
    
      errorServicioConsulta(error: any) {
        this.errorServicio('Se presentó un problema al realizar la consulta.', error)
        return []
      }
    
      errorServicioGuardado(error: any) {
        this.errorServicio('Se presentó un problema al realizar acción.', error)
        return []
      }
}