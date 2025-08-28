import { PaymentForm } from "@/components/payments/payment-form"

export default function NewPaymentPage() {
  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-6">Record Payment</h1>
      <PaymentForm />
    </div>
  )
}
