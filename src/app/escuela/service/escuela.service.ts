import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar, UtilFile, UtilMsgs } from '../../util/global';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EscuelaModel, Escuela } from '../../models/escuela.model';

@Injectable()
export class EscuelaService {
  private escuela = new BehaviorSubject<EscuelaModel>(null);
  public escuela$ = this.escuela.asObservable();

  private imgPerfil = new Subject<any>();
  public imgPerfil$ = this.imgPerfil.asObservable();

  constructor(
    private http: HttpClient,
    private backendInterceptor: BackendInterceptor
  ) { }

  getEscuela() {
    if (this.escuela.getValue() !== null) {
      this.escuela.next(this.escuela.getValue());
    } else {
      this.http
        .get(GlobalVar.uriApi + 'escuela', {})
        .subscribe((response: EscuelaModel) => {
          this.escuela.next(response);
        });
    }
  }

  postImgPerfil(fileImgPerfil) {
    const file = fileImgPerfil.srcElement.files[0];
    const data = {
      fotoPerfil: file.name
    };
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    formData.append('data', JSON.stringify(data));

    this.http
      .post(GlobalVar.uriApi + 'escuelaPerfil', formData)
      .subscribe(response => {
        const r = response;
      });
  }
  getImgPerfil(strFileUrl) {
    return this.http
      .get(GlobalVar.uriApi + 'escuelaPerfil', {
        responseType: 'blob',
        params: new HttpParams().set('strFileUrl', strFileUrl)
      })
      .subscribe(respose => {
        this.imgPerfil.next(UtilFile.imageFromBlob(respose));
      });
  }

  postEscuela(escuela, resp) {
    this.http
      .post(GlobalVar.uriApi + 'escuela', escuela)
      .subscribe((response: EscuelaModel) => {
        this.escuela.next(response);
        resp(UtilMsgs.cambiosGuardados);
      });
  }
}
