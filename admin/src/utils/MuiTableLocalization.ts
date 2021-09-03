import { MUIDataTableTextLabels } from 'mui-datatables';

export const MuiDataTableFALocalization: MUIDataTableTextLabels = {
  body: {
    columnHeaderTooltip: (column) => column.label ?? 'مرتب سازی',
    noMatch: 'هیچ رکوردی یافت نشد',
    toolTip: 'مرتب سازی',
  },
  filter: {
    all: 'همه',
    reset: 'بازنشانی',
    title: 'فیلترها',
  },
  pagination: {
    rowsPerPage: 'تعداد ردیف در هر صفحه',
    next: 'صفحه بعد',
    previous: 'صفحه قبل',
    displayRows: 'از',
  },
  selectedRows: {
    delete: 'حذف',
    text: 'ردیف انتخاب شده',
  },
  toolbar: {
    downloadCsv: 'دانلود فایل CSV',
    filterTable: 'فیلترهای جدول',
    print: 'پرینت',
    search: 'جستجو',
    viewColumns: 'مشاهده ستون ها',
  },
  viewColumns: {
    title: 'ستون های قابل مشاهده',
  },
};
