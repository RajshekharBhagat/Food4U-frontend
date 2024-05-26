import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form"

type Props = {
    cuisines: string
    field : ControllerRenderProps<FieldValues,'cuisines'>;
};

const CuisinesCheckBox = ({cuisines,field}: Props) => {

    return (
            <FormItem className="flex flex-row mx-2 items-center space-x-1 space-y-0 mt-2">
                <FormControl>
                    <Checkbox
                        className="bg-white"
                        checked={field.value.includes(cuisines)}
                        onCheckedChange={(checked) => {
                            if(checked) {
                                field.onChange([...field.value,cuisines]);
                            } else {
                                field.onChange(
                                    field.value.filter((value:string) => value !== cuisines)
                                )
                            }
                        }}
                    />
                </FormControl>
                <FormLabel className="text-sm font-normal">{cuisines}</FormLabel>
            </FormItem>
    )
}

export default CuisinesCheckBox;