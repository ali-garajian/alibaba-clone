import MuiDataTable, { MUIDataTableColumn } from 'mui-datatables';
import useSwr from 'swr';

import { TicketsApi } from 'services';
import { MuiDataTableFALocalization } from 'utils/MuiTableLocalization';

const columns: MUIDataTableColumn[] = [
  { name: 'id', label: 'شناسه' },
  { name: 'ticketType', label: 'نوع بلیط' },
  { name: 'airplane', label: 'مدل هواپیما' },
  { name: 'airline', label: 'ایرلاین' },
  { name: 'class', label: 'کلاس پرواز' },
  { name: 'source', label: 'مبدا' },
  { name: 'destination', label: 'مقصد' },
  { name: 'departureDate', label: 'تاریح پرواز' },
  { name: 'terminalNumber', label: 'شماره ترمینال' },
  { name: 'price', label: 'قیمت (تومان)' },
  { name: 'quantity', label: 'تعداد بلیط مانده' },
];

function TicketListPage() {
  const { data, mutate } = useSwr(
    `/tickets`,
    () =>
      TicketsApi.getTicketList({
        // TODO: impl. pagination
        page: 1,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <MuiDataTable
      title="لیست بلیط ها"
      data={data?.data ?? []}
      columns={columns}
      options={{
        textLabels: MuiDataTableFALocalization,
        onRowsDelete: (rowsDeleted, newData) => {
          const prevData = data?.data!;
          const deletedRowIds = rowsDeleted.data.map(
            (i) => prevData[i.index].id
          );
          TicketsApi.deleteTickets({
            ids: deletedRowIds,
          })
            .then((res) => {
              alert(res.msg);
              mutate(
                (prev) => ({
                  ...prev!,
                  data: prevData.filter((i) => !deletedRowIds.includes(i.id)),
                }),
                false
              );
            })
            .catch((e) => {
              alert(e.message ?? e.msg ?? 'خطایی رخ داده است');
              return false;
            });
        },
      }}
    />
  );
}

export default TicketListPage;
