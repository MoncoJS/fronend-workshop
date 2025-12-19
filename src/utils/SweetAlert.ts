import Swal from 'sweetalert2'

export const SweetAlert = {
  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      showConfirmButton: false,
      timer: 1500,
    })
  },

  error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
    })
  },

  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#F76907',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ต้องการลบ',
      cancelButtonText: 'ยกเลิก',
    })
    return result.isConfirmed
  },
}
