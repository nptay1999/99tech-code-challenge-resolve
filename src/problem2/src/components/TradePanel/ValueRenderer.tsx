import {
  Controller,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

const ValueRenderer = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>(
  props: Omit<
    ControllerProps<TFieldValues, TName, TTransformedValues>,
    "render"
  >
) => {
  const { control } = useFormContext<TFieldValues, TName, TTransformedValues>();

  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { value } }) => <>{value}</>}
    />
  );
};

export default ValueRenderer;
