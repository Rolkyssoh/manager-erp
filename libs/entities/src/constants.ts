export enum STATE_ORDER_STATUS {
  create = 'create', //At the commercial director
  checking = 'checking', //At the customer (Bon de commande)
  checked = 'checked', // At the sector delegate
  canceled = 'canceled',
  is_billed = 'is_billed', //At the customer again
  settled_bill = 'settled_bill', //At the sector delegate or the deliverer
  consigned_bill = 'consigned_bill',
}
