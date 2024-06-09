import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useUser from "../../../../../hooks/useUser";
import { HashLoader } from "react-spinners";

const PaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments ? payments.length : 0;
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (currentUser) {
      axiosFetch.get(`/payment-history/${currentUser._id}/${currentUser.email}`) // Adjusted endpoint
        .then(res => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching payment history:", err);
          setLoading(false); // Update loading state even on error
        });
    }
  }, [axiosFetch, currentUser]);

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      <div className="text-center mt-6 mb-16">
        <p className="text-grey-400">
          Hey,<span className="text-secondary font-bold">{currentUser?.name} Welcome...</span>
        </p>
        <h1 className="text-4xl font-bold">My Payment History</h1>
        <p className="text-gray-500 text-sm my-3">You can see your payment history here</p>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold font-xl">Total Payments: {totalItem}</p>
            <h1 className="font-bold">Total Paid: $ {totalPaidAmount}</h1>
          </div>
          
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white bg-gray-500">Index</th>
                <th className="px-4 py-2 text-white bg-gray-800">Amount</th>
                <th className="px-4 py-2 text-white bg-gray-500">Classes</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{(page - 1) * itemsPerPage + idx + 1}</td>
                  <td className="border px-4 py-2">${payment.amount}</td>
                  <td className="border px-4 py-2">{payment.classesId.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleChange(null, Math.max(page - 1, 1))}
              disabled={page === 1}
              className={`bg-blue-400 px-4 py-2 rounded ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Previous
            </button>
            <button
              onClick={() => handleChange(null, Math.min(page + 1, Math.ceil(totalItem / itemsPerPage)))}
              disabled={page === Math.ceil(totalItem / itemsPerPage)}
              className={`bg-blue-400 px-4 py-2 rounded ${page === Math.ceil(totalItem / itemsPerPage) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
