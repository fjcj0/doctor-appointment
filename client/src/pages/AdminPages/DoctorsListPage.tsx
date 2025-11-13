import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { doctors } from "../../constants/data";
import LoaderDashboard from "../../tools/LoaderDashboard";
const DoctorsListPage = () => {
    const onChangeCheck = async () => {

    }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    if (isLoading) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-5">
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {
                    doctors.map((doctor, index) => (
                        <Card
                            key={index}
                            name={doctor.name}
                            image={doctor.image}
                            available={doctor.available}
                            specail={doctor.specail}
                            index={index}
                            isCheckAble={true}
                            onChnageCheck={onChangeCheck}
                        />
                    ))
                }
            </div>
        </div>
    );
}
export default DoctorsListPage;