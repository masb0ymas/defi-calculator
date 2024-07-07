import { Divider, Group, Stack, Text, Title } from "@mantine/core";
import { roundDecimal, validateNumber } from "~/core/utils/number";

interface FormulaEntity {
  supplies: any[];
  borrowed: any[];
}

interface FormulaProps {
  data: FormulaEntity;
}

export default function Formula(props: FormulaProps) {
  const { data } = props;

  const colleteral = data.supplies.reduce((acc, curValue) => {
    const usdValue = Number(curValue.price) * Number(curValue.amount);

    acc += usdValue;

    return acc;
  }, 0);

  const total_borrow = data.borrowed.reduce((acc, curValue) => {
    const usdValue = Number(curValue.price) * Number(curValue.amount);

    acc += usdValue;

    return acc;
  }, 0);

  const health_factor_dirty = (colleteral * 0.85) / total_borrow;
  const health_factor = validateNumber(health_factor_dirty);
  const result_hf = roundDecimal(health_factor);

  return (
    <section>
      <Stack gap={5} mt={20}>
        <Title order={5}>
          <u>Formula:</u>
        </Title>
        <Text fw={600}>Health Factor (HF):</Text>
        <Text>HF = (Colleteral * Liquid Threshold) / Total Borrow</Text>

        <Text>
          {`HF = (${validateNumber(colleteral)} * 0.85) / ${validateNumber(
            total_borrow
          )}`}{" "}
          ={" "}
          <Text component="span" fw={600}>
            {result_hf <= 0 ? "?" : <u>{result_hf}</u>}
          </Text>
        </Text>

        <Divider variant="dashed" />

        <Group gap={5}>
          <Text fw={600}>Health Factor = </Text>
          <Title order={5}>{result_hf <= 0 ? "?" : <u>{result_hf}</u>}</Title>
        </Group>

        <Divider variant="dashed" />
      </Stack>

      <Stack gap={5} mt={30}>
        <Text fw={600}>Aset Liquidation Price (LP):</Text>
        <Text>LP = Borrow / (HF - 1)</Text>
      </Stack>
    </section>
  );
}
