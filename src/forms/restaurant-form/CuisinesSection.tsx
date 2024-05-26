import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { cuisinesList } from "@/config/restaurant-option-config";
import { useFormContext } from "react-hook-form"
import CuisinesCheckBox from "./CuisinesCheckBox";

const CuisinesSection = () => {

    const {control} = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-xl font-bold">
                    Cuisines
                </h2>
                <FormDescription>
                    Select the Cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField 
                control={control}
                name="cuisines"
                render={({field}) => (
                    <FormItem >
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisinesList.map((cuisinesItem, index) => (
                                <CuisinesCheckBox key={index} cuisines={cuisinesItem} field={field} />
                            ))}
                        </div>
                    </FormItem>
                )}    
            />
        </div>
    )

}

export default CuisinesSection;