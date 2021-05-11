import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Medidas } from "../../../models/medidas";
import { CertificadoService } from "./certificado.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProyectoService } from "../../proyecto.service";
import { map } from "rxjs/operators";
import { ShowEventArgs } from 'ng2-adsk-forge-viewer';

//mejorar el codigo de las funciones usas , se pudo hacer mejor pero por la falta de tiempo se hizo de esta forma

@Component({
  selector: 'ngx-obra-cert',
  templateUrl: './obra-cert.component.html',
  styleUrls: ['./obra-cert.component.scss']
})
export class ObraCertComponent implements OnInit {

  workbook: Excel.Workbook = new Excel.Workbook();
  blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  hiddenItem: boolean = true;
  hiddenSubitem: boolean = false;
  hiddenListItem: boolean = false;
  hiddenIva: boolean = false;
  hiddenAdelanto: boolean = false;
  cert_group: FormGroup;
  itemCert: FormGroup;
  arrayItem: any[] = [];
  arrayItem2: any[] = [];
  arrayTest: any[] = [];
  itemIndex: number = -1;
  lastRowItemFormula: number;
  lastRowItems: number;
  anticipoRow: string;
  ivaRow: string;
  defaultIVA: number;
  defaultAdelanto: number;
  modifIva: boolean = false;
  modifAdelanto: boolean = false;
  ivaAdelantoForm: boolean = false;
  editSub: boolean = false;
  unidadesMedida: Array<Medidas>;
  legajoProy: number;
  nCert: number;//numero de cert
  myForm = new FormGroup({
    file: new FormControl('',)
  });
  ArrayNitem =[];

  

  observOldCert:any = this.certSrv.getAnteriorCert(1, 28).pipe(
    map(data => {

      return data;

    })
  );

  worksheet = this.workbook.addWorksheet('My Sheet', {
    properties: {
      defaultRowHeight: 31,
    }
  });


  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private certSrv: CertificadoService,
    private proySrv: ProyectoService,
    private route: ActivatedRoute,
    private router: Router) {
    // let worksheet = this.workbook.addWorksheet('My Sheet', {
    //   properties: {
    //     defaultRowHeight: 21,
    //   }
    // });
    this.legajoProy = +this.route.snapshot.paramMap.get('legajoProy'); //numero de legajo
    this.nCert = +this.route.snapshot.paramMap.get('nCert');//numero de cert







    ///////////////////////test////////////////////////


    //  for (let index = 0; index < ob2.length; index++) {
    //    const element = ob2[index];
    //    obj[index][0] = element

    //  }

    // ob2.forEach(data=>{
    //   let i=0;
    //   console.log(i);
    //   obj[i]=data;
    //   i++;
    // })
    ///////////////////////test////////////////////////

    this.certSrv.getMedidas().subscribe(medidas => {
      this.unidadesMedida = medidas;
      //console.log("MEDIDAS" + JSON.stringify(this.unidadesMedida));
    })
    this.worksheet;
    //pone todas las casillas sin bordes
    this.worksheet.views = [{
      showGridLines: false
    }];

    this.cert_group = this.createCertForm(this.fb);
    this.itemCert = this.createItemCertForm(this.fb);
    this.arrayItem = [];



    this.worksheet.getColumn("A").width = 1.2;
    this.worksheet.getColumn("B").width = 5.86;
    this.worksheet.getColumn("C").width = 55;
    this.worksheet.getColumn("D").width = 4.86;
    this.worksheet.getColumn("E").width = 7.86;
    this.worksheet.getColumn("F").width = 9.86;
    this.worksheet.getColumn("G").width = 17.86;
    this.worksheet.getColumn("H").width = 14;
    this.worksheet.getColumn("I").width = 14;
    this.worksheet.getColumn("J").width = 12.86;
    this.worksheet.getColumn("K").width = 7.86;
    this.worksheet.getColumn("L").width = 8.86;
    this.worksheet.getColumn("M").width = 12.86;
    this.worksheet.getColumn("N").width = 7.86;
    this.worksheet.getColumn("O").width = 8.86;
    this.worksheet.getColumn("P").width = 15;

    this.worksheet.mergeCells(`B10:B12`);
    this.worksheet.mergeCells(`C10:C12`);
    this.worksheet.mergeCells(`D10:D12`);
    this.worksheet.mergeCells(`E10:G11`);
    this.worksheet.mergeCells(`H10:P10`);
    this.worksheet.mergeCells(`H11:J11`);
    this.worksheet.mergeCells(`K11:M11`);
    this.worksheet.mergeCells(`N11:P11`);
    this.worksheet.mergeCells(`M6:P7`);

    this.worksheet.getRow(8).height = 21;
    this.worksheet.getRow(9).height = 1;
    this.worksheet.getRow(13).height = 3;
    this.worksheet.getRow(14).height = 3;



    this.proySrv.get1Proy(this.legajoProy).subscribe(data => {
      let clienteProy: any = data.cliente;
      let nombreProy: any = data.nombre;

      this.addColumnClient("C", 6, clienteProy, this.worksheet, "esp");
      this.addColumnProyecto("c", 7, nombreProy, this.worksheet, "esp");
    })


    this.addOrdenDeCompraProyecto("h", 6, "2", this.worksheet, "esp");
    this.addColumnMontoOc("h", 7, "", this.worksheet, "esp");
    this.addColumnCertificado("m", 6, this.nCert.toString(), this.worksheet, "esp");
    this.addColumnDate("n", 8, this.worksheet, "esp");
    this.boxBordeline("b", "p", 1, 8, "thick", this.worksheet);
    this.addColumnContratado("e", 10, this.worksheet, "esp");
    this.addColumnCertificated("h", 10, this.worksheet, "esp");
    this.addColumnUd("d", 10, this.worksheet, "esp");
    this.addColumnItemN("b", 10, this.worksheet, "esp");
    this.addColumnItemDesc("c", 10, this.worksheet, "esp");

    this.worksheet.getCell('I7').alignment = {
      vertical: 'top',
      horizontal: "left",

    }
    this.worksheet.getCell('B10').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('C10').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('D10').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('E10').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('E12').alignment = {
      vertical: 'middle',
      horizontal: "center",
    }
    this.worksheet.getCell('F12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('G12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('H10').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('H11').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('K11').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('N11').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('H12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('I12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('J12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('K12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('L12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('M12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('N12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('O12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }
    this.worksheet.getCell('P12').alignment = {
      vertical: 'middle',
      horizontal: "center",
      wrapText: true
    }




    /* ----------------------------comandos a usar -------------------------------------*/
    //this.worksheet.getCell('B2').value = { formula: '=A2 + A3', date1904: false }; add formulas
    //this.worksheet.mergeCells(`B1:E1`); unir celdas

    //borders add
    /* this.worksheet.getCell('C3').border = {
      top: {style:'thick'},
      left: {style:'thick'},
      bottom: {style:'thick'},
      right: {style:'thick'}
    };*/
    //add values
    // this.worksheet.getCell('A2').value = 1;
    // this.worksheet.getCell('A3').value = 1;

    /* ----------------------------comandos a usar -------------------------------------*/






    this.worksheet.getCell("A3").alignment = {
      vertical: 'middle',
      horizontal: "center"
    }






    //TODO hacer que agrege de la base de datos no del front
    const img = "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eQL4noErte2vNoDZT9LrbS1yBPRtAxfXbU3aAy53gMEnTdRFW/LR9BYKwPsZfVMOGLgFutec3lr7OH0AMtTV8g1wcAiMFil73eXdwc7e/j3T6u8HUgBymh4HXCgAAA+caVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6ZGE4ODc4ZWYtNTg0Ny00YzBiLWEwMmEtNzE5YjI5ZDE3YWIxIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1NzVmYmRhLTE1NjctNDYwZS04YjE0LWEyZWI3MzJiYWI1YiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjEwODM2MDZlLWUzOTAtNGRmYi05Y2U0LWExOGU2ZmQwZjE4ZSIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2MDQ1MDYyNTU0NjM3NzQiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yMiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjAxNTFjOGEtMGMxOS00NzcwLWFlMGYtYjM5OGE0ZTlmYWYzIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIwLTExLTA0VDEzOjEwOjU1Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBsdXM6SW1hZ2VTdXBwbGllcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlU3VwcGxpZXI+CiAgIDxwbHVzOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlQ3JlYXRvcj4KICAgPHBsdXM6Q29weXJpZ2h0T3duZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpDb3B5cmlnaHRPd25lcj4KICAgPHBsdXM6TGljZW5zb3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpMaWNlbnNvcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkM7bFQAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCwQQCjfnx7uHAAAgAElEQVR42uy9WYwl53Xn+fuWiLj35lqZtWTtG/dVJCVREilSkklLbXfTtmQaHjfQQKN7jHmYh3mYlwHmoTEGjOlBo4EejUe2Whh5RmrbIrVLpigWxX1nsUSyqlj7kpVZlVm5L3eJ5fu+Mw9xayVFsYpVotUdf+Aibl5kZcWN+P5xzvmf850DFSpUqFChQoUKFSpUqFChQoUKFSpUqFChQoUKFSr81wdVXYIKF6NYPirt5hx5lhLHMUmtTlIfQNU3VeulIliFy4FrTsjJk0eYGD9EuzmP1hk2UiAa5zzG9LJieIS1G65leP3HqnVTEazCB8XCyV/KiROHmZkaoyiWMKZAUxCkAFFobdG2jjE9xPEA/YNrWLt2M4Pr76jWT0WwCu+HU4d+IZMnjzIzfRLBkUSgVA54bKQxKAIaMHhvyQqIbI3hlesYWrWBtVvueFBFQ09W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";

    var imgId = this.workbook.addImage(
      {
        base64: img,
        extension: "png"
      }
    )


    //convertir en una funcion que agrege nuestro logo de empresa desde una seleccion
    this.worksheet.addImage(imgId, 'N1:P5');

    this.worksheet.getCell('A1').font = {
      name: 'Cg omega',
      family: 4,
      size: 16,
      underline: true,
      bold: false
    };



  }



  ngOnInit() {
    this.observOldCert.subscribe(
      data =>{
        this.setCertOld(data);
      }
    )
   setTimeout(() => {
    console.log(this.ArrayNitem);
    console.log(JSON.stringify(this.ArrayNitem[0][0]));
    }, 2000);;
  }

  setCertOld(arrayNewCert:any){
    this.ArrayNitem = arrayNewCert;
   // console.log(this.ArrayNitem);
  }


  showIva() {
    if (this.hiddenIva) {
      this.hiddenIva = false;
    } else {
      this.hiddenIva = true;
    }
  }

  showAdelanto() {
    if (this.hiddenAdelanto) {
      this.hiddenAdelanto = false;
    } else {
      this.hiddenAdelanto = true;
    }
  }

  setIva(iva: number) {
    this.defaultIVA = Number(iva) * 0.01;
    this.modifIva = true;
  }

  setAdelanto(adelanto: number) {
    this.defaultAdelanto = Number(adelanto) * 0.01;
    this.modifAdelanto = true;
  }

  blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  exportAsXLSX(): void {

    if (!this.modifIva) {
      this.defaultIVA = 0.21
    }

    if (!this.modifAdelanto) {
      this.defaultAdelanto = 0.35
    }

    this.addItemsTable();//PASO1
    this.addFieldSubtotal(this.lastRowItemFormula);//PASO2
    this.addHeaderConceptos(this.lastRowItems);//PASO3
    this.addFormulaMontosTotal(this.lastRowItemFormula, this.lastRowItems);//PASO4
    //aca funcion que grabe en data base


    this.workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: this.blobType });
      console.log(data);
      // console.log(blob);
      let name;
      // this.excelService.exportAsExcelFile(data, 'sample');
      FileSaver.saveAs(blob, 'test');
      let formData: any = new FormData();
      let cert = this.blobToFile(blob, "");
      name = cert.name + this.legajoProy + '_' + this.nCert;

      formData.append("cert", cert, name);
      this.certSrv.uploadCert(formData);


    });

    this.certSrv.nuevo_cert(this.arrayItem, this.legajoProy, this.nCert, this.defaultIVA, this.defaultAdelanto);

    console.log(JSON.stringify(this.arrayItem));
    // console.log(this.arrayItem[0][0][0]["nombre_subItem"]);
    console.table(this.arrayItem);

    //working
    this.router.navigate(["pages/generacion-documentos"]);
  }

  createCertForm(fb: FormBuilder) {
    return fb.group({
      nombre_subItem: ['', Validators.required],
      tipo_unidad: ['', Validators.required],
      cantidad: [''],
      unitario: [''],
      importe: [''],
      acumuladoAvance: [''],
      anteriorAvance: [''],
    })
  }

  createItemCertForm(fb: FormBuilder) {
    return fb.group({
      nombre_itemCert: ["", Validators.required],
      buscarItem: [""]
    })
  }




  //agrega los sub items al item
  checkVal() {
    // console.log(this.cert_group.value);
    this.arrayItem2.push(this.cert_group.value);
    this.arrayItem[this.itemIndex][0] = this.arrayItem2;
    // console.log(this.itemIndex);
    // console.log(this.arrayItem);
  }

  print() {
    this.hiddenItem = true;
  }

  searchIndex() {
    for (let index = 0; index < this.arrayItem.length; index++) {


      if (this.arrayItem[index].nombre_itemCert === this.itemCert.value.buscarItem) {
        // console.log("cola--------------" + index);
      } else {
        // console.log("no cola")
      }
      // console.table(this.arrayItem[index][0].length);

      for (let i = 0; i < this.arrayItem[index][0].length; i++) {
        const element = this.arrayItem[index][0][i];
        // console.log(this.arrayItem[index][0][i].nombre_subItem);
        if (this.arrayItem[index][0][i].nombre_subItem === "cara") {
          // console.log("cara   index " + index + " -------i------->" + i);
        }
      }
    }
    // console.log(this.itemCert.value.buscarItem);
    // console.table(this.arrayItem);
  }



  addItemsTable() {
    this.hiddenItem = true;
    let contArea = 0;
    let casillaInicial = 13;
    let arrayNItem;
    if (this.nCert != 1) {
      console.log("diff 1");



    }
    this.arrayItem.forEach(data => {
      //TODO capacidad de insertar nuevos items para cuando se hagan certificados subsiguientes a este
      let countRows = 0;
      contArea++;
      casillaInicial++;
      /****************************************ESTILOS***************************************************/
      this.worksheet.getCell("B" + (casillaInicial + 1).toString()).value = contArea;
      this.worksheet.getCell("C" + (casillaInicial + 1).toString()).value = data.nombre_itemCert;

      //TODO hacer con un for loop or while loop
      [("B" + (casillaInicial + 1).toString()),
      ("C" + (casillaInicial + 1).toString()),
      ("D" + (casillaInicial + 1).toString()),
      ("E" + (casillaInicial + 1).toString()),
      ("F" + (casillaInicial + 1).toString()),
      ("G" + (casillaInicial + 1).toString()),
      ("H" + (casillaInicial + 1).toString()),
      ("I" + (casillaInicial + 1).toString()),
      ("J" + (casillaInicial + 1).toString()),
      ("K" + (casillaInicial + 1).toString()),
      ("L" + (casillaInicial + 1).toString()),
      ("M" + (casillaInicial + 1).toString()),
      ("N" + (casillaInicial + 1).toString()),
      ("O" + (casillaInicial + 1).toString()),
      ("P" + (casillaInicial + 1).toString()),
      ].map(key => {
        this.worksheet.getCell(key).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'cccccc' }
        };

        if (key === ("B" + (casillaInicial + 1).toString())) {
          this.worksheet.getCell(key).border = {
            bottom: { style: "thin" },
            left: { style: "thick" },
            top: { style: "thick" },

          }
          this.worksheet.getCell(key).alignment = {
            vertical: 'middle',
            horizontal: 'center'
          }
        } else if (key === ("P" + (casillaInicial + 1).toString())) {
          this.worksheet.getCell(key).border = {
            bottom: { style: "thin" },
            right: { style: "thick" },
            top: { style: "thick" },
          }
        } else {
          this.worksheet.getCell(key).border = {
            bottom: { style: "thin" },
            top: { style: "thick" },
          }
        }
        this.worksheet.getCell(key).font = { bold: true, name: "Arial", size: 10 };
        this.worksheet.getCell(key).alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }

      });
      /****************************************FIN ESTILOS***************************************************/

      //add while e index de sub items para iterar
      data[0].forEach(subData => {

        casillaInicial++;//guardar en db para despues saber desde donde cargar en el caso de que se necesiten cargar mas items
        // console.log(casillaInicial);
        this.worksheet.getCell("B" + (casillaInicial + 1).toString()).value = "" + contArea + "." + (countRows + 1) + "";
        this.worksheet.getCell("C" + (casillaInicial + 1).toString()).value = subData.nombre_subItem;
        this.worksheet.getCell("D" + (casillaInicial + 1).toString()).value = subData.tipo_unidad;
        this.worksheet.getCell("E" + (casillaInicial + 1).toString()).value = subData.cantidad;
        this.worksheet.getCell("F" + (casillaInicial + 1).toString()).value = Number(subData.unitario);
        this.worksheet.getCell("G" + (casillaInicial + 1).toString()).value = { formula: '=' + ("F" + (casillaInicial + 1).toString()) + '*' + ("E" + (casillaInicial + 1).toString()), date1904: false };
        this.worksheet.getCell("I" + (casillaInicial + 1).toString()).value = Number(subData.acumuladoAvance) * 0.01//convierte a percent 1 =100 ;
        this.worksheet.getCell("L" + (casillaInicial + 1).toString()).value = Number(subData.anteriorAvance) * 0.01;

        this.worksheet.getCell("H" + (casillaInicial + 1).toString()).value = { formula: "=I" + (casillaInicial + 1).toString() + "*" + "E" + (casillaInicial + 1).toString(), date1904: false };
        this.worksheet.getCell("J" + (casillaInicial + 1).toString()).value = { formula: "=I" + (casillaInicial + 1).toString() + "*" + "G" + (casillaInicial + 1).toString(), date1904: false };
        let presentFormulaCant = ("=+H" + (casillaInicial + 1).toString() + "-" + "K" + (casillaInicial + 1).toString());
        let presentFormulaAvance = ("=+I" + (casillaInicial + 1).toString() + "-" + "L" + (casillaInicial + 1).toString());
        let presentFormulaImport = ("=+J" + (casillaInicial + 1).toString() + "-" + "M" + (casillaInicial + 1).toString());

        let anteriorFormulaCant = ("=+L" + (casillaInicial + 1).toString() + "*" + "E" + (casillaInicial + 1).toString());
        let anteriorFormulaImport = ("=+L" + (casillaInicial + 1).toString() + "*" + "G" + (casillaInicial + 1).toString());

        this.worksheet.getCell("N" + (casillaInicial + 1).toString()).value = { formula: presentFormulaCant, date1904: false };
        this.worksheet.getCell("O" + (casillaInicial + 1).toString()).value = { formula: presentFormulaAvance, date1904: false };
        this.worksheet.getCell("P" + (casillaInicial + 1).toString()).value = { formula: presentFormulaImport, date1904: false };
        this.worksheet.getCell("K" + (casillaInicial + 1).toString()).value = { formula: anteriorFormulaCant, date1904: false };
        this.worksheet.getCell("M" + (casillaInicial + 1).toString()).value = { formula: anteriorFormulaImport, date1904: false };


        [
          ("H" + (casillaInicial + 1).toString()),
          ("I" + (casillaInicial + 1).toString()),
          ("J" + (casillaInicial + 1).toString()),
          ("K" + (casillaInicial + 1).toString()),
          ("L" + (casillaInicial + 1).toString()),
          ("M" + (casillaInicial + 1).toString()),
          ("N" + (casillaInicial + 1).toString()),
          ("O" + (casillaInicial + 1).toString()),
          ("P" + (casillaInicial + 1).toString())
        ].map(key => {
          if (key === ("I" + (casillaInicial + 1).toString()) || key === ("L" + (casillaInicial + 1).toString()) || key === ("O" + (casillaInicial + 1).toString())) {
            // console.log("percent!!!!!!!!!!!!!!!!")
            this.worksheet.getCell(key).style = {
              numFmt: "0.00%"
            };
          } else if (key === ("J" + (casillaInicial + 1).toString()) || key === ("M" + (casillaInicial + 1).toString()) || key === ("P" + (casillaInicial + 1).toString())) {
            // console.log("DOLA!!!!!!!!!!!!!!!!")
            this.worksheet.getCell(key).style = {
              numFmt: "#,##0.00"
            };
          }
          this.worksheet.getCell(key).alignment = {
            vertical: 'middle',
            horizontal: 'center'
          }
        });
        countRows++;

        //TODO capacidad de insertar nuevos items para cuando se hagan certificados subsiguientes a este
        // console.log(countRows);



        /****************************************ESTILOS***************************************************/
        this.worksheet.getCell(("F" + (casillaInicial + 1).toString())).style = {
          numFmt: "#,##0.00"
        };

        this.worksheet.getCell(("G" + (casillaInicial + 1).toString())).style = {
          numFmt: "$#,##0.00"
        };


        [("B" + (casillaInicial + 1).toString()),
        ("C" + (casillaInicial + 1).toString()),
        ("D" + (casillaInicial + 1).toString()),
        ("E" + (casillaInicial + 1).toString()),
        ("F" + (casillaInicial + 1).toString()),
        ("G" + (casillaInicial + 1).toString()),
        ("H" + (casillaInicial + 1).toString()),
        ("I" + (casillaInicial + 1).toString()),
        ("J" + (casillaInicial + 1).toString()),
        ("K" + (casillaInicial + 1).toString()),
        ("L" + (casillaInicial + 1).toString()),
        ("M" + (casillaInicial + 1).toString()),
        ("N" + (casillaInicial + 1).toString()),
        ("O" + (casillaInicial + 1).toString()),
        ].map(key => {
          this.worksheet.getCell(key).font = { bold: false, name: "Arial", size: 10 };
          this.worksheet.getCell(key).alignment = {
            vertical: 'middle',
            horizontal: 'left'
          }

          if (key === ("B" + (casillaInicial + 1).toString())) {
            this.worksheet.getCell(key).border = {
              bottom: { style: "thin" },
              left: { style: "thick" },
              top: { style: "thin" },

            }

          } else if (key === ("C" + (casillaInicial + 1).toString()) || key === ("G" + (casillaInicial + 1).toString())) {
            this.worksheet.getCell(key).border = {
              bottom: { style: "thin" },
              right: { style: "thin" },
              top: { style: "thin" },
            }
          } else if (key === ("D" + (casillaInicial + 1).toString())) {
            this.worksheet.getCell(key).border = {
              bottom: { style: "thin" },
              left: { style: "thin" },
              top: { style: "thin" },
              right: { style: "thin" },
            }
          } else {
            this.worksheet.getCell(key).border = {
              bottom: { style: "thin" },
              top: { style: "thin" },
            }

          }

          if (key === ("C" + (casillaInicial + 1).toString())) {
            this.worksheet.getCell(key).alignment = {
              vertical: 'middle',
              horizontal: 'left'
            }
          } else {
            this.worksheet.getCell(key).alignment = {
              vertical: 'middle',
              horizontal: 'center'
            }
          }

        })

        this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).border = {
          bottom: { style: "thin" },
          top: { style: "thin" },
          right: { style: "thick" }
        }
        this.worksheet.getCell(("M" + (casillaInicial + 1).toString())).border = {
          bottom: { style: "thin" },
          top: { style: "thin" },
          right: { style: "thin" }
        }
        this.worksheet.getCell(("J" + (casillaInicial + 1).toString())).border = {
          bottom: { style: "thin" },
          top: { style: "thin" },
          right: { style: "thin" }
        }



        /****************************************FIN ESTILOS***************************************************/


      })

    })
    //se utiliza para grabar la ultima hilera y poder agregar los otros campos
    //guardar en db cuando se manden los items


    this.lastRowItems = (casillaInicial + 1);
    this.lastRowItemFormula = (casillaInicial + 1);

  }



  addFieldSubtotal(lastRowItems: number) {
    //  TODO Crear array alfabetico y hacer que el puntero se mueva de 3 en 3 para elegir las letras iniciales de cada celda a insertar
    let casillaInicial = lastRowItems + 1;
    this.worksheet.getRow(casillaInicial).height = 3;
    this.worksheet.getRow(casillaInicial + 1).height = 30;
    this.worksheet.mergeCells(`B` + (casillaInicial).toString() + `:P` + (casillaInicial).toString());
    this.worksheet.getCell("B" + (casillaInicial + 1).toString()).value = "SUBTOTAL.";
    this.worksheet.getCell("G" + (casillaInicial + 1).toString()).value = { formula: '=SUM(G15: ' + ('G' + (lastRowItems.toString()).toUpperCase()) + ')', date1904: false };
    this.worksheet.getCell("J" + (casillaInicial + 1).toString()).value = { formula: '=SUM(J15: ' + ('J' + (lastRowItems.toString()).toUpperCase()) + ')', date1904: false };
    this.worksheet.getCell("M" + (casillaInicial + 1).toString()).value = { formula: '=SUM(M15: ' + ('M' + (lastRowItems.toString()).toUpperCase()) + ')', date1904: false };
    this.worksheet.getCell("P" + (casillaInicial + 1).toString()).value = { formula: '=SUM(P15: ' + ('P' + (lastRowItems.toString()).toUpperCase()) + ')', date1904: false };
    this.worksheet.getCell("I7").value = { formula: '=' + ("G" + (casillaInicial + 1).toString()), date1904: false };
    this.worksheet.getCell("I7").style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' }
    };
    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" },
    };

    [("G" + (casillaInicial + 1).toString()),
    ("J" + (casillaInicial + 1).toString()),
    ("M" + (casillaInicial + 1).toString()),
    ("P" + (casillaInicial + 1).toString())
    ].map(key => {
      this.worksheet.getCell(key).style = {
        numFmt: "$#,##0.00"
      };
    });


    [
      ("B" + (casillaInicial + 1).toString()),
      ("H" + (casillaInicial + 1).toString()),
      ("K" + (casillaInicial + 1).toString()),
      ("N" + (casillaInicial + 1).toString())
    ].map(keys => {
      // console.log(keys);
      this.worksheet.getCell(keys).border = {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
      };

      this.worksheet.getCell(keys).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
    });
    [
      ("C" + (casillaInicial + 1).toString()),
      ("D" + (casillaInicial + 1).toString()),
      ("E" + (casillaInicial + 1).toString()),
      ("F" + (casillaInicial + 1).toString()),
      ("G" + (casillaInicial + 1).toString()),
      ("I" + (casillaInicial + 1).toString()),
      ("J" + (casillaInicial + 1).toString()),
      ("L" + (casillaInicial + 1).toString()),
      ("M" + (casillaInicial + 1).toString()),
      ("O" + (casillaInicial + 1).toString()),
    ].map(keys => {
      this.worksheet.getCell(keys).border = {
        top: { style: "thick" },
        bottom: { style: "thick" },
      };

      this.worksheet.getCell(keys).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
      this.worksheet.getCell(keys).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });
    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).border = {
      top: { style: "thick" },
      right: { style: "thick" },
      bottom: { style: "thick" },
    };

    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' }
    };

    this.worksheet.getCell(("B" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }
    this.worksheet.getCell(("B" + (casillaInicial + 1).toString())).alignment = {
      vertical: 'middle',

    }
    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"

    };
    this.worksheet.getCell(("G" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }
    this.worksheet.getCell(("J" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 10, bold: true }
    this.worksheet.getCell(("M" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 10, bold: true }
    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 10, bold: true }
    this.lastRowItems = casillaInicial + 1;







  }

  addHeaderConceptos(lastRowItems: number) {
    let casillaInicial = lastRowItems + 1;
    this.worksheet.getRow(casillaInicial).height = 3;
    this.worksheet.getRow(casillaInicial + 1).height = 40;
    this.worksheet.getCell("C" + (casillaInicial + 1).toString()).value = "Conceptos.";
    this.worksheet.mergeCells(`E` + (casillaInicial + 1).toString() + `:G` + (casillaInicial + 1).toString());
    this.worksheet.mergeCells(`H` + (casillaInicial + 1).toString() + `:J` + (casillaInicial + 1).toString());
    this.worksheet.mergeCells(`K` + (casillaInicial + 1).toString() + `:M` + (casillaInicial + 1).toString());
    this.worksheet.mergeCells(`N` + (casillaInicial + 1).toString() + `:P` + (casillaInicial + 1).toString());


    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" },
    };


    [
      ("B" + (casillaInicial + 1).toString()),
      ("E" + (casillaInicial + 1).toString()),
      ("H" + (casillaInicial + 1).toString()),
    ].map(keys => {

      this.worksheet.getCell(keys).border = {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
      };


    });
    [
      ("C" + (casillaInicial + 1).toString()),
      ("D" + (casillaInicial + 1).toString()),
    ].map(keys => {
      this.worksheet.getCell(keys).border = {
        top: { style: "thick" },
        bottom: { style: "thick" },
      };

      this.worksheet.getCell(keys).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });
    this.worksheet.getCell(("K" + (casillaInicial + 1).toString())).border = {
      top: { style: "thick" },
      left: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" }
    };





    this.worksheet.getCell(("C" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }
    this.worksheet.getCell(("C" + (casillaInicial + 1).toString())).alignment = {
      vertical: 'middle',

    }
    this.worksheet.getCell(("G" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }
    this.worksheet.getCell(("J" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }
    this.worksheet.getCell(("M" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }
    this.worksheet.getCell(("P" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true }

    this.worksheet.getCell("E" + (casillaInicial + 1).toString()).value = "Total Contratado.";
    this.worksheet.getCell("N" + (casillaInicial + 1).toString()).value = "Total Presente.";
    this.worksheet.getCell("K" + (casillaInicial + 1).toString()).value = "Total Anterior.";
    this.worksheet.getCell("H" + (casillaInicial + 1).toString()).value = " Total Acumulado.";

    [
      ("E" + (casillaInicial + 1).toString()),
      ("N" + (casillaInicial + 1).toString()),
      ("K" + (casillaInicial + 1).toString()),
      ("H" + (casillaInicial + 1).toString())
    ].map(key => {
      this.worksheet.getCell(key).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });



    this.lastRowItems = casillaInicial + 1;



    //TODO add stilos
  }

  addFormulaMontosTotal(lastRowItemsFormula: number, lastRowItems: number) {
    let casillaInicial = lastRowItems + 1;
    this.worksheet.getRow(casillaInicial).height = 3;
    this.worksheet.getCell(("E" + (casillaInicial + 1).toString())).style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell(("H" + (casillaInicial + 1).toString())).style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell(("K" + (casillaInicial + 1).toString())).style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell(("N" + (casillaInicial + 1).toString())).style = {
      numFmt: "$#,##0.00"
    };


    this.worksheet.getCell("C" + (casillaInicial + 1).toString()).value = "Monto sin Impuestos.";
    this.worksheet.mergeCells(`E` + (casillaInicial + 1).toString() + `:G` + (casillaInicial + 1).toString());
    this.worksheet.mergeCells(`H` + (casillaInicial + 1).toString() + `:J` + (casillaInicial + 1).toString());
    this.worksheet.mergeCells(`K` + (casillaInicial + 1).toString() + `:M` + (casillaInicial + 1).toString());
    this.worksheet.mergeCells(`N` + (casillaInicial + 1).toString() + `:P` + (casillaInicial + 1).toString());

    this.worksheet.getCell("E" + (casillaInicial + 1).toString()).value = { formula: '=+SUM(G15: ' + ('G' + (lastRowItemsFormula.toString()).toUpperCase()) + ')', date1904: false }; //contratado
    this.worksheet.getCell("J" + (casillaInicial + 1).toString()).value = { formula: '=+SUM(J15: ' + ('J' + (lastRowItemsFormula.toString()).toUpperCase()) + ')', date1904: false }; //anterior
    this.worksheet.getCell("M" + (casillaInicial + 1).toString()).value = { formula: '=+SUM(M15: ' + ('M' + (lastRowItemsFormula.toString()).toUpperCase()) + ')', date1904: false }; //presente
    this.worksheet.getCell("P" + (casillaInicial + 1).toString()).value = { formula: '=+SUM(P15: ' + ('P' + (lastRowItemsFormula.toString()).toUpperCase()) + ')', date1904: false }; //acumulado
    let presentMontoNoImpuesto = ("N" + (casillaInicial + 1).toString());
    let contratadoNoImpuesto = ("E" + (casillaInicial + 1).toString());
    let acumuladoNoImpuesto = ("H" + (casillaInicial + 1).toString());


    [

      ("H" + (casillaInicial + 1).toString()),
      ("K" + (casillaInicial + 1).toString()),
      ("N" + (casillaInicial + 1).toString()),
    ].map(key => {

      this.worksheet.getCell(key).border = {
        top: { style: "thick" },
        bottom: { style: "dotted" },
        left: { style: "thick" },
        right: { style: "thick" },
      }

      this.worksheet.getCell(key).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }

    });

    [
      ("B" + (casillaInicial + 1).toString()),
      ("C" + (casillaInicial + 1).toString()),
      ("D" + (casillaInicial + 1).toString()),
      ("E" + (casillaInicial + 1).toString()),
    ].map(key => {

      if (key === ("B" + (casillaInicial + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          bottom: { style: "dotted" },
          left: { style: "thick" }

        }
      } else {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          bottom: { style: "dotted" },

        }
      }

      if (key === ("C" + (casillaInicial + 1).toString())) {
        this.worksheet.getCell(key).alignment = {
          vertical: 'middle',
          horizontal: 'left'
        }
      } else {
        this.worksheet.getCell(key).alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }
      }



    });

    this.worksheet.getRow(casillaInicial + 1).height = 30;
    this.worksheet.getCell(("E" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true };
    this.worksheet.getCell(("C" + (casillaInicial + 1).toString())).font = { name: "Arial", size: 12, bold: true };
    this.lastRowItems = casillaInicial + 1;

    this.worksheet.getCell(("H" + (this.lastRowItems + 1).toString())).style = {
      numFmt: '0.00%'
    };

    this.worksheet.getCell(("K" + (this.lastRowItems + 1).toString())).style = {
      numFmt: '0.00%'
    };

    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).style = {
      numFmt: '0.00%'
    };



    this.worksheet.getCell("C" + (this.lastRowItems + 1).toString()).value = "Avances (%).";
    this.worksheet.mergeCells(`E` + (this.lastRowItems + 1).toString() + `:G` + (this.lastRowItems + 1).toString());
    this.worksheet.mergeCells(`H` + (this.lastRowItems + 1).toString() + `:J` + (this.lastRowItems + 1).toString());
    this.worksheet.mergeCells(`K` + (this.lastRowItems + 1).toString() + `:M` + (this.lastRowItems + 1).toString());
    this.worksheet.mergeCells(`N` + (this.lastRowItems + 1).toString() + `:P` + (this.lastRowItems + 1).toString());


    let acumuladoPercenform = '(N' + ((this.lastRowItems).toString()) + '/E' + (this.lastRowItems.toString()) + ')';
    let presentePercenform = '(K' + ((this.lastRowItems).toString()) + '/E' + (this.lastRowItems.toString()) + ')';
    let anteriorPercenform = '(H' + ((this.lastRowItems).toString()) + '/E' + (this.lastRowItems.toString()) + ')';


    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).value = { formula: acumuladoPercenform, date1904: false };
    this.worksheet.getCell("K" + (this.lastRowItems + 1).toString()).value = { formula: presentePercenform, date1904: false };
    this.worksheet.getCell("H" + (this.lastRowItems + 1).toString()).value = { formula: anteriorPercenform, date1904: false };
    let acumuladoPercentResult = ("H" + (this.lastRowItems + 1).toString());
    [
      ("N" + (this.lastRowItems + 1).toString()),
      ("K" + (this.lastRowItems + 1).toString()),
      ("H" + (this.lastRowItems + 1).toString())
    ].map(keys => {

      this.worksheet.getCell(keys).border = {

        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      }

      this.worksheet.getCell(keys).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });


    [
      ("B" + (this.lastRowItems + 1).toString()),
      ("C" + (this.lastRowItems + 1).toString()),
      ("D" + (this.lastRowItems + 1).toString()),
      ("E" + (this.lastRowItems + 1).toString()),
    ].map(key => {

      if (key === ("B" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {

          bottom: { style: "thick" },
          left: { style: "thick" }

        }
      } else {
        this.worksheet.getCell(key).border = {
          bottom: { style: "thick" },

        }
      }

      if (key === ("C" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).alignment = {
          vertical: 'middle',
          horizontal: 'left'
        }
      } else {
        this.worksheet.getCell(key).alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }
      }



    });

    this.worksheet.getRow(this.lastRowItems + 1).height = 30;


    this.lastRowItems = this.lastRowItems + 2

    this.worksheet.getRow(this.lastRowItems).height = 3;
    this.worksheet.getRow(this.lastRowItems + 1).height = 30;

    this.worksheet.getCell("C" + (this.lastRowItems + 1).toString()).value = "Anticipo.";
    this.worksheet.getCell("D" + (this.lastRowItems + 1).toString()).value = this.defaultAdelanto;
    //seteamos variable para saber donde esta la celda con el valor del anticipo por si la necesitamos modificar despues
    this.anticipoRow = ("D" + (this.lastRowItems + 1).toString());
    this.worksheet.getCell("D" + (this.lastRowItems + 1).toString()).style = {
      numFmt: '0%'
    };

    // console.log(this.lastRowItems - 1);
    this.worksheet.mergeCells(`H` + (this.lastRowItems + 1).toString() + `:J` + (this.lastRowItems + 1).toString());
    this.worksheet.mergeCells(`K` + (this.lastRowItems + 1).toString() + `:M` + (this.lastRowItems + 1).toString());
    this.worksheet.mergeCells(`N` + (this.lastRowItems + 1).toString() + `:P` + (this.lastRowItems + 1).toString());


    let anteriorIvaForm = '(H' + ((this.lastRowItems - 2).toString()) + '*' + (this.anticipoRow.toString()) + ')';
    let presenteIvaForm = '(K' + ((this.lastRowItems - 2).toString()) + '*' + (this.anticipoRow.toString()) + ')';
    let acumuladoIvaForm = '(N' + ((this.lastRowItems - 2).toString()) + '*' + (this.anticipoRow.toString()) + ')';
    let anticipoPresenteCell = ("N" + ((this.lastRowItems + 1).toString()));

    this.worksheet.getCell("H" + (this.lastRowItems + 1).toString()).style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell("K" + (this.lastRowItems + 1).toString()).style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).style = {
      numFmt: "$#,##0.00"
    };

    this.worksheet.getCell("H" + (this.lastRowItems + 1).toString()).value = { formula: anteriorIvaForm, date1904: false };
    this.worksheet.getCell("K" + (this.lastRowItems + 1).toString()).value = { formula: presenteIvaForm, date1904: false };
    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).value = { formula: acumuladoIvaForm, date1904: false };

    this.worksheet.getCell(("P" + (this.lastRowItems + 1).toString())).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" },
    };


    [
      ("B" + (this.lastRowItems + 1).toString()),
      ("H" + (this.lastRowItems + 1).toString()),
      ("K" + (this.lastRowItems + 1).toString()),
      ("N" + (this.lastRowItems + 1).toString())
    ].map(keys => {
      // console.log(keys);
      this.worksheet.getCell(keys).border = {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
      };


    });
    [
      ("C" + (this.lastRowItems + 1).toString()),
      ("D" + (this.lastRowItems + 1).toString()),
      ("E" + (this.lastRowItems + 1).toString()),
      ("F" + (this.lastRowItems + 1).toString()),
      ("G" + (this.lastRowItems + 1).toString()),
      ("I" + (this.lastRowItems + 1).toString()),
      ("J" + (this.lastRowItems + 1).toString()),
      ("L" + (this.lastRowItems + 1).toString()),
      ("M" + (this.lastRowItems + 1).toString()),
      ("O" + (this.lastRowItems + 1).toString()),
    ].map(keys => {
      this.worksheet.getCell(keys).border = {
        top: { style: "thick" },
        bottom: { style: "thick" },
      };

      this.worksheet.getCell(keys).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });

    // console.log("tis is last round *---------ZZZZZ>>>>>" + this.lastRowItems);
    [

      ("H" + (this.lastRowItems + 1).toString()),
      ("K" + (this.lastRowItems + 1).toString()),
      ("N" + (this.lastRowItems + 1).toString())
    ].map(key => {


      this.worksheet.getCell(key).border = {
        left: { style: "thick" },
        right: { style: "thick" },
        top: { style: "thick" },
        bottom: { style: "thick" }
      };


      this.worksheet.getCell(key).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    });

    this.worksheet.getCell(("P" + (this.lastRowItems + 1).toString())).border = {
      top: { style: "thick" },
      right: { style: "thick" },
      bottom: { style: "thick" },
    };



    this.worksheet.getCell(("C" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 12 }
    this.worksheet.getCell(("C" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',

    }
    this.worksheet.getCell(("D" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 10 }
    this.worksheet.getCell(("H" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 10 }
    this.worksheet.getCell(("K" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 10 }
    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 10 }




    this.lastRowItems = this.lastRowItems + 2
    //end line
    this.worksheet.getRow(this.lastRowItems).height = 3;
    this.worksheet.getCell("N" + (this.lastRowItems + 2).toString()).style = {
      numFmt: "$#,##0.00"
    };
    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).style = {
      numFmt: "$#,##0.00"
    };

    this.worksheet.getCell("C" + (this.lastRowItems + 1).toString()).value = "Monto presente Certificado (con descuento proporcional de Anticipo Financiero).";
    this.worksheet.getCell(("C" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 14 };
    this.worksheet.getCell(("C" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "left"
    }



    this.worksheet.mergeCells(`N` + (this.lastRowItems + 1).toString() + `:P` + (this.lastRowItems + 1).toString());

    // console.log("monto no impuesto cell  ->>>>>>>>>" + presentMontoNoImpuesto);

    // console.log("anticipoPresenteCell ->>>>>>>>>" + anticipoPresenteCell);

    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).value = { formula: "=+" + presentMontoNoImpuesto + "-" + anticipoPresenteCell, date1904: false };
    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"
    };

    this.worksheet.getCell("D" + (this.lastRowItems + 2).toString()).style = {
      numFmt: '0%'
    };




    [
      ("B" + (this.lastRowItems + 2).toString()),
      ("C" + (this.lastRowItems + 2).toString()),
      ("D" + (this.lastRowItems + 2).toString()),
      ("E" + (this.lastRowItems + 2).toString()),
      ("F" + (this.lastRowItems + 2).toString()),
      ("G" + (this.lastRowItems + 2).toString()),
      ("H" + (this.lastRowItems + 2).toString()),
      ("I" + (this.lastRowItems + 2).toString()),
      ("J" + (this.lastRowItems + 2).toString()),
      ("K" + (this.lastRowItems + 2).toString()),
      ("L" + (this.lastRowItems + 2).toString()),
      ("M" + (this.lastRowItems + 2).toString()),
      ("N" + (this.lastRowItems + 2).toString()),
    ].map(key => {
      // console.log("dotted!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

      if (key === ("B" + (this.lastRowItems + 2).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "dotted" },
          left: { style: "thick" },
          bottom: { style: "thick" }
        };
      } else if (key === ("P" + (this.lastRowItems + 2).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "dotted" },
          right: { style: "thick" },
          bottom: { style: "thick" }
        };
      } else {
        this.worksheet.getCell(key).border = {
          top: { style: "dotted" },
          bottom: { style: "thick" }
        };

      }


    });
    //FIX PARA LA COLUMNA P Q NO SE QUERIA PONER EL RIGTH SIDE CON BORDER
    this.worksheet.getCell(("Q" + (this.lastRowItems + 2).toString())).border = {
      left: { style: "thick" },
    };

    this.worksheet.getCell(("C" + (this.lastRowItems + 2).toString())).alignment = {
      vertical: 'middle',
      horizontal: "left"
    };

    this.worksheet.getCell(("D" + (this.lastRowItems + 2).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"
    };


    [
      ("B" + (this.lastRowItems + 1).toString()),
      ("C" + (this.lastRowItems + 1).toString()),
      ("D" + (this.lastRowItems + 1).toString()),
      ("E" + (this.lastRowItems + 1).toString()),
      ("F" + (this.lastRowItems + 1).toString()),
      ("G" + (this.lastRowItems + 1).toString()),
      ("H" + (this.lastRowItems + 1).toString()),
      ("I" + (this.lastRowItems + 1).toString()),
      ("J" + (this.lastRowItems + 1).toString()),
      ("K" + (this.lastRowItems + 1).toString()),
      ("L" + (this.lastRowItems + 1).toString()),
      ("M" + (this.lastRowItems + 1).toString()),
      ("N" + (this.lastRowItems + 1).toString()),
    ].map(key => {

      this.worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
      if (key === ("B" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          left: { style: "thick" },

        };
      } else if (key === ("P" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          right: { style: "thick" },

        };
      } else {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },

        };

      }
    });
    this.worksheet.getCell(("Q" + (this.lastRowItems + 1).toString())).border = {
      left: { style: "thick" },
    };
    this.worksheet.getCell(("N" + (this.lastRowItems + 2).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"
    };

    //dotted
    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 14 };

    let montoPresente = ("N" + (this.lastRowItems + 1).toString());
    this.worksheet.getCell("C" + (this.lastRowItems + 2).toString()).value = "Impuestos (I.V.A.).";
    this.worksheet.getCell("D" + (this.lastRowItems + 2).toString()).value = this.defaultIVA;
    this.ivaRow = ("D" + (this.lastRowItems + 2).toString());

    this.worksheet.mergeCells(`N` + (this.lastRowItems + 2).toString() + `:P` + (this.lastRowItems + 2).toString());

    //


    this.worksheet.getCell("N" + (this.lastRowItems + 2).toString()).value = { formula: "=" + montoPresente + "*" + "0.21", date1904: false };
    let montoIvaCell = ("N" + (this.lastRowItems + 2).toString());

    this.worksheet.getRow((this.lastRowItems + 1)).height = 34.50;
    this.worksheet.getRow((this.lastRowItems + 2)).height = 22.50;

    this.lastRowItems = this.lastRowItems + 3;

    this.worksheet.getRow(this.lastRowItems).height = 3;
    this.worksheet.getRow(this.lastRowItems + 1).height = 35;
    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).style = {
      numFmt: "$#,##0.00"
    };

    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"
    };
    this.worksheet.getCell(("C" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "left"
    };

    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 14, bold: true };
    this.worksheet.getCell(("C" + (this.lastRowItems + 1).toString())).font = { name: "Arial", size: 14, bold: true };

    this.worksheet.getCell("C" + (this.lastRowItems + 1).toString()).value = "TOTAL CERTIFICADO ACTUAL.";



    this.worksheet.mergeCells(`N` + (this.lastRowItems + 1).toString() + `:P` + (this.lastRowItems + 1).toString());
    //aca fixeando

    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).value = { formula: "=+" + montoPresente + "+" + montoIvaCell, date1904: false };

    [
      ("B" + (this.lastRowItems + 1).toString()),
      ("C" + (this.lastRowItems + 1).toString()),
      ("D" + (this.lastRowItems + 1).toString()),
      ("E" + (this.lastRowItems + 1).toString()),
      ("F" + (this.lastRowItems + 1).toString()),
      ("G" + (this.lastRowItems + 1).toString()),
      ("H" + (this.lastRowItems + 1).toString()),
      ("I" + (this.lastRowItems + 1).toString()),
      ("J" + (this.lastRowItems + 1).toString()),
      ("K" + (this.lastRowItems + 1).toString()),
      ("L" + (this.lastRowItems + 1).toString()),
      ("M" + (this.lastRowItems + 1).toString()),
      ("N" + (this.lastRowItems + 1).toString()),
      ("O" + (this.lastRowItems + 1).toString()),
      ("P" + (this.lastRowItems + 1).toString()),
    ].map(key => {
      this.worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
      if (key === ("B" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          left: { style: "thick" },
          bottom: { style: "thick" },

        };
      } else if (key === ("P" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          right: { style: "thick" },
          bottom: { style: "thick" },

        };
      } else {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          bottom: { style: "thick" },

        };

      }

    })



    this.lastRowItems = this.lastRowItems + 2;
    this.worksheet.getRow(this.lastRowItems).height = 3;
    this.worksheet.getRow(this.lastRowItems + 1).height = 30;


    this.worksheet.getCell("H" + (this.lastRowItems + 1).toString()).value = "Resta ejecutar y certificar:";
    this.worksheet.getCell("H" + (this.lastRowItems + 1).toString()).alignment = {
      vertical: 'middle',
      horizontal: "left"
    };



    //caca
    this.worksheet.mergeCells(`K` + (this.lastRowItems + 1).toString() + `:M` + (this.lastRowItems + 1).toString());
    this.worksheet.mergeCells(`N` + (this.lastRowItems + 1).toString() + `:P` + (this.lastRowItems + 1).toString());

    this.worksheet.getCell("K" + (this.lastRowItems + 1).toString()).value = { formula: "=1-" + acumuladoPercentResult, date1904: false };


    this.worksheet.getCell("K" + (this.lastRowItems + 1).toString()).style = {
      numFmt: '0.00%'
    };

    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).value = { formula: "=" + contratadoNoImpuesto + "-" + acumuladoNoImpuesto, date1904: false };
    this.worksheet.getCell("N" + (this.lastRowItems + 1).toString()).style = {
      numFmt: "$#,##0.00"
    };


    [
      ("B" + (this.lastRowItems + 1).toString()),
      ("C" + (this.lastRowItems + 1).toString()),
      ("D" + (this.lastRowItems + 1).toString()),
      ("E" + (this.lastRowItems + 1).toString()),
      ("F" + (this.lastRowItems + 1).toString()),
      ("G" + (this.lastRowItems + 1).toString()),
      ("H" + (this.lastRowItems + 1).toString()),
      ("I" + (this.lastRowItems + 1).toString()),
      ("J" + (this.lastRowItems + 1).toString()),
      ("K" + (this.lastRowItems + 1).toString()),
      ("L" + (this.lastRowItems + 1).toString()),
      ("M" + (this.lastRowItems + 1).toString()),
      ("N" + (this.lastRowItems + 1).toString()),
      ("O" + (this.lastRowItems + 1).toString()),
      ("P" + (this.lastRowItems + 1).toString()),
    ].map(key => {

      if (key === ("B" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          left: { style: "thick" },
          bottom: { style: "thick" },

        };
      } else if (key === ("P" + (this.lastRowItems + 1).toString()) || key === ("J" + (this.lastRowItems + 1).toString())) {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          right: { style: "thick" },
          bottom: { style: "thick" },

        };
      } else {
        this.worksheet.getCell(key).border = {
          top: { style: "thick" },
          bottom: { style: "thick" },

        };

      }

    });

    this.worksheet.getCell(("N" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"
    };
    this.worksheet.getCell(("K" + (this.lastRowItems + 1).toString())).alignment = {
      vertical: 'middle',
      horizontal: "center"
    };

    this.lastRowItems = this.lastRowItems + 2;

    this.worksheet.getRow(this.lastRowItems).height = 3;
    this.worksheet.getRow(this.lastRowItems + 2).height = 129;
    this.boxBordeline("b", "p", (this.lastRowItems + 1), (this.lastRowItems + 4), "thick", this.worksheet);
    this.worksheet.getRow(this.lastRowItems + 5).height = 1;

    this.worksheet.getCell("C" + (this.lastRowItems + 1).toString()).value = "Firmas:";
    this.worksheet.getCell("C" + (this.lastRowItems + 3).toString()).value = "Por Contratista.";
    this.worksheet.getCell("N" + (this.lastRowItems + 3).toString()).value = "Por Comitente.";

    [
      ("C" + (this.lastRowItems + 3).toString()),
      ("N" + (this.lastRowItems + 3).toString())
    ].map(key => {
      this.worksheet.getCell(key).alignment = {
        vertical: 'middle',
        horizontal: "center"
      };


      this.worksheet.getCell(key).font = { name: "Arial", size: 8 };
    })
    this.worksheet.getCell("C" + (this.lastRowItems + 1).toString()).font = { name: "Arial", size: 10, bold: true };



  }

  addItem() {
    this.hiddenItem = false;
    this.arrayItem.push(this.itemCert.value);
    this.arrayItem.forEach(data => {
      // console.log(data)
    });
    // console.table(this.arrayItem);


    this.arrayItem2 = [];

    this.itemIndex++;
  }



  addColumnItemN(column: string, cell: number, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell


    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "N°\nÍtem";
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Item\nN°";
        break;
      default:
        break;
    }

    worksheet.getCell(columCell.toString().toUpperCase()).font = { bold: true, name: "Arial", size: 10 };
    worksheet.getCell(columCell.toString().toUpperCase()).border = {
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }

    worksheet.getCell(columCell.toString().toUpperCase()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' }
    };
  }

  addColumnUd(column: string, cell: number, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { bold: true, name: "Arial", size: 10 };
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Ud.";
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Ut.";
        break;
      default:
        break;
    }


    worksheet.getCell(columCell.toString().toUpperCase()).border = {
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }

    worksheet.getCell(columCell.toString().toUpperCase()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' }
    };
  }


  addColumnItemDesc(column: string, cell: number, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());

    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Descripción del Ítem.";
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Item Description.";
        break;
      default:
        break;
    }

    worksheet.getCell(columCell.toString().toUpperCase()).font = { bold: true, name: "Arial", size: 10 };
    worksheet.getCell(columCell.toString().toUpperCase()).border = {
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }

    worksheet.getCell(columCell.toString().toUpperCase()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' }
    };
  }
  addColumnContratado(column: string, cell: number, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell;
    const mai = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
    // console.log((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2));

    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "CONTRATADO";
        worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).value = "Cant.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).value = "Unitario.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).value = "Importe.";
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "HIRED";
        worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).value = "Amou.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).value = "Unit.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).value = "Sum.";

        break;
      default:
        break;
    }
    worksheet.getCell(columCell.toString().toUpperCase()).font = { bold: true, name: "Arial", size: 12 };
    worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };

    [(columCell.toString().toUpperCase()),
    ((column + (cell + 2)).toString().toUpperCase()),
    ((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2))
    ].map(key => {
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
    });


    worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell(columCell.toString().toUpperCase()).border = {

      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
  }

  addColumnCertificated(column: string, cell: number, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell;
    worksheet.getRow(cell).height = 22.50;
    worksheet.getRow(cell + 1).height = 22.50;
    worksheet.getRow(cell + 2).height = 22.50;
    const mai = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
    // console.log((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2));

    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "CERTIFICADO";
        worksheet.getCell((column + (cell + 1)).toString().toUpperCase()).value = "Acumulado";

        worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).value = "Cant.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).value = "Avance";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).value = "Importe";

        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 1)).value = "Anterior";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 2)).value = "Cant.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 4]) + (cell + 2)).value = "Avance";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 5]) + (cell + 2)).value = "Importe";


        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 1)).value = "Presente";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 2)).value = "Cant.";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 7]) + (cell + 2)).value = "Avance";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 8]) + (cell + 2)).value = "Importe";

        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "CERTIFICADO";

        worksheet.getCell((column + (cell + 1)).toString().toUpperCase()).value = "Accrued";
        worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).value = "Amount";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).value = "Progress";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).value = "Sum";

        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 1)).value = "Previous";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 2)).value = "Amount";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 4]) + (cell + 2)).value = "Progress";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 5]) + (cell + 2)).value = "Sum";


        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 1)).value = "Current";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 2)).value = "Amount";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 7]) + (cell + 2)).value = "Progress";
        worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 8]) + (cell + 2)).value = "Sum";

        break;
      default:
        break;
    }

    [(columCell.toString().toUpperCase()),
    ((column + (cell + 1)).toString().toUpperCase()),
    (column + (cell + 2)).toString().toUpperCase(),
    ((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 1)),
    ((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 4]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 5]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 1)),
    ((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 7]) + (cell + 2)),
    ((mai[mai.indexOf(column.toUpperCase()) + 8]) + (cell + 2)),
    ].map(key => {
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
    });



    worksheet.getCell(columCell.toString().toUpperCase()).font = { bold: true, size: 12, name: "Arial" };
    worksheet.getCell((column + (cell + 1)).toString().toUpperCase()).font = { bold: true, size: 10, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 1)).font = { bold: true, size: 10, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 1)).font = { bold: true, size: 10, name: "Arial" };
    worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 4]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 5]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 7]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 8]) + (cell + 2)).font = { bold: true, size: 9, name: "Arial" };


    worksheet.getCell(columCell.toString().toUpperCase()).border = {

      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((column + (cell + 1)).toString().toUpperCase()).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 1)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 1)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((column + (cell + 2)).toString().toUpperCase()).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 1]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 2]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 3]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 4]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 5]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }

    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 6]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 7]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
    worksheet.getCell((mai[mai.indexOf(column.toUpperCase()) + 8]) + (cell + 2)).border = {
      top: { style: "thick" },
      bottom: { style: "thick" },
      left: { style: "thick" },
      right: { style: "thick" },
    }
  }

  addColumnClient(column: string, cell: number, cliente: string, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { name: 'Cg omega', size: 11, underline: 'single' };
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Comitente: " + cliente;
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Client: " + cliente;
        break;
      default:
        break;
    }
  }

  addColumnProyecto(column: string, cell: number, proyectoName: string, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { name: 'Cg omega', size: 11, underline: 'single' };
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Proyecto: " + proyectoName;
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Project: " + proyectoName;
        break;
      default:
        break;
    }
  }

  addOrdenDeCompraProyecto(column: string, cell: number, OrdenDeCompra: string, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { name: 'Cg omega', size: 11, underline: 'single' };
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Orden de compra N°: " + OrdenDeCompra;
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Purchase Order N°: " + OrdenDeCompra;
        break;
      default:
        break;
    }
  }

  addColumnMontoOc(column: string, cell: number, montoOC: string, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { name: 'Cg omega', size: 11, underline: 'single' };
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Monto de OC:";
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Amount of PO:";
        break;
      default:
        break;
    }
  }

  addColumnCertificado(column: string, cell: number, Certificado: string, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { name: 'Arial', size: 14, bold: true };
    worksheet.getCell(columCell.toString().toUpperCase()).alignment = {
      vertical: 'middle',
      horizontal: "center"
    }
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Certificado N°" + Certificado;
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Certificate N°" + Certificado;
        break;
      default:
        break;
    }


  }


  addColumnDate(column: string, cell: number, worksheet: Excel.Worksheet, idioma: string) {
    let text = idioma.toUpperCase();
    let columCell = column + cell
    // console.log(columCell.toString().toUpperCase());
    worksheet.getCell(columCell.toString().toUpperCase()).font = { name: 'Cg omega', size: 11, underline: 'single' };
    worksheet.getCell(columCell.toString().toUpperCase()).alignment = {
      vertical: 'middle',

    }
    switch (text) {
      case "ESP":
        worksheet.getCell(columCell.toString().toUpperCase()).value = 'Fecha: ' + this.datePipe.transform(Date.now(), 'mediumDate');
        break;
      case "ENG":
        worksheet.getCell(columCell.toString().toUpperCase()).value = "Date: " + this.datePipe.transform(Date.now(), 'mediumDate');
        break;
      default:
        break;
    }
  }



  //TODO mejorar esta funcion en un futuro ya que esta planteada de forma asquerosa
  boxBordeline(columnaInicial: string, columnaFinal: string, celdaInicial: number, celdaFinal: number, borderThick: string, worksheet: Excel.Worksheet) {
    const mai = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
    let arraySelecterd = mai.slice(mai.indexOf(columnaInicial.toUpperCase()), (mai.indexOf(columnaFinal.toUpperCase())) + 1);
    let firstcolumn = arraySelecterd[0];
    let lastcolumn = arraySelecterd[arraySelecterd.length - 1];
    let i = celdaInicial
    for (let index = 0; index < arraySelecterd.length; index++) {
      const element = arraySelecterd[index];
      // console.log("elemento elegido:  " + element)
      while (i <= celdaFinal) {
        // console.log(i);
        if (i === celdaFinal) {
          // console.log("la ultima es " + element + i);
          worksheet.getCell(element + i).border = {
            bottom: { style: "thick" },
          }
        }

        if (i === celdaInicial) {
          // console.log("la ultima es " + element + i);
          worksheet.getCell(element + i).border = {
            top: { style: "thick" },
          }
        }
        worksheet.getCell(firstcolumn + i).border = {
          left: { style: "thick" }
        }
        worksheet.getCell(lastcolumn + i).border = {
          right: { style: "thick" }
        }
        i++;
      }
      i = celdaInicial;
    }
    worksheet.getCell(firstcolumn + celdaInicial).border = {
      top: { style: 'thick' },
      left: { style: "thick" }
    }
    worksheet.getCell(lastcolumn + celdaInicial).border = {
      top: { style: 'thick' },
      right: { style: "thick" }
    }
    worksheet.getCell(firstcolumn + celdaFinal).border = {
      bottom: { style: 'thick' },
      left: { style: "thick" }
    }
    worksheet.getCell(lastcolumn + (celdaFinal + 1)).border = {
      top: { style: "thick" },

    }
    worksheet.getCell(lastcolumn + celdaFinal).border = {

      right: { style: "thick" }
    }
  }

}
