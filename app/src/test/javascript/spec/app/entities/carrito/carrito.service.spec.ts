/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import CarritoService from '@/entities/carrito/carrito.service';
import { Carrito } from '@/shared/model/carrito.model';
import { OrdenStatus } from '@/shared/model/enumerations/orden-status.model';
import { MetodoDePago } from '@/shared/model/enumerations/metodo-de-pago.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('Carrito Service', () => {
    let service: CarritoService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new CarritoService();
      currentDate = new Date();
      elemDefault = new Carrito(123, currentDate, OrdenStatus.COMPLETO, 0, MetodoDePago.EFECTIVO, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fecha: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Carrito', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            fecha: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Carrito', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Carrito', async () => {
        const returnedFromService = Object.assign(
          {
            fecha: dayjs(currentDate).format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            precioTotal: 1,
            metodoDePago: 'BBBBBB',
            referencia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Carrito', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Carrito', async () => {
        const patchObject = Object.assign(
          {
            fecha: dayjs(currentDate).format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            precioTotal: 1,
          },
          new Carrito()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Carrito', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Carrito', async () => {
        const returnedFromService = Object.assign(
          {
            fecha: dayjs(currentDate).format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            precioTotal: 1,
            metodoDePago: 'BBBBBB',
            referencia: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Carrito', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Carrito', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Carrito', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
