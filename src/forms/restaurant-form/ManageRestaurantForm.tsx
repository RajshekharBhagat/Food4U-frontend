import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/Types/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant Name is required",
    }),
    city: z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated Delivery Time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please Select at least one item"
    }),
    menu: z.array(z.object({
        name:z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
    })),
    imageFile: z.string().optional(),
    imageUrl : z.union([z.string().url().optional(), z.instanceof(File, { message: "Must be a file" }).optional()])
}).refine((data) => data.imageUrl || data.imageFile, {
    message: 'Either Image URL or Image File must be provided',
    path: ['imageUrl'],
});

type RestaurantFormData = z.infer <typeof formSchema>



type Props = {
    onSave : (restaurantFormData: FormData) => void;
    isLoading: boolean,
    restaurant?: Restaurant,
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            cuisines:[],
            menu:[{name:"", price: 0}],
        },
    });

    useEffect(() => {

        if(!restaurant) {
            return;
        }
        
        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice).toFixed(2));
        const menuFormated = restaurant.menu.map((item) =>({
            ...item,
            price: parseInt((item.price).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menu: menuFormated,
        };

        form.reset(updatedRestaurant);

    }, [form,restaurant]);
    

    const onSubmit = (formDataJson: RestaurantFormData) => {

        const formData = new FormData();

        formData.append('restaurantName',formDataJson.restaurantName);
        formData.append('city',formDataJson.city);
        formData.append('country',formDataJson.country);
        formData.append('deliveryPrice',(formDataJson.deliveryPrice).toString());
        formData.append('estimatedDeliveryTime',formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine,index) => {
            formData.append(`cuisines[${index}]`,cuisine);
        });
        formDataJson.menu.forEach((menuItem,index) => {
            formData.append(`menu[${index}][name]`,menuItem.name);
            formData.append(`menu[${index}][price]`,(menuItem.price).toString());
        });
        if(formDataJson.imageUrl) {
             formData.append('imageUrl',formDataJson.imageUrl); 
        }
        onSave(formData);
    }
    return (
            <FormProvider {...form}>  
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8 bg-red-50 p-5 md:p-10 rounded-lg"> 
                    <DetailSection />   
                    <Separator/>
                    <CuisinesSection/>
                    <Separator />
                    <MenuSection />
                    <Separator />
                    <ImageSection />
                    {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
                </form>
            </FormProvider>
            
    )
}

export default ManageRestaurantForm;