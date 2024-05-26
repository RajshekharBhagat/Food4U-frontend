import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
    const { control } = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'menu',
    }); 

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl">Menu Items</h2>
      </div>
      <FormDescription>
        Create your Menu
      </FormDescription>
      <FormField
        control={control}
        name="menu"
        render={() => (
            <FormItem className="flex flex-col gap-2">
                {
                    fields.map((_, index) => (
                        <MenuItemInput
                            key={index}
                            index={index}
                            removeMenuItem = {() => remove(index)}
                        />
                    ))
                }
            </FormItem>
        )}
      />
      <Button type="button"
        onClick={() => append({name:"", price: ""})}>
            Add Menu
        </Button>
    </div>
  )
}

export default MenuSection;
