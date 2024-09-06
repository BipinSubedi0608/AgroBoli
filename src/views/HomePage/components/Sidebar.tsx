import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

type FilterType = { category: string; checkboxLabels: string[] };

const filters: FilterType[] = [
  {
    category: "Farm Location",
    checkboxLabels: [
      "Local (within same area)",
      "Regional (within same district)",
    ],
  },
  {
    category: "Minimum Bid Range",
    checkboxLabels: [
      "Under Rs. 100",
      "Rs. 100 - Rs. 500",
      "Rs. 500 - Rs. 1000",
      "Rs. 1000 - Rs. 2000",
      "Above Rs. 2000",
    ],
  },
];

export function SideBar() {
  return (
    <aside className="absolute left-0 bg-white lg:bg-slate-100 shadow-2xl min-h-screen w-full">
      <h2 className="text-center font-semibold text-xl">Filters</h2>
      <Divider variant="middle" className="!my-3" />
      <div className="px-3">
        {filters.map((filter, index) => (
          <div key={filter.category}>
            <Typography variant="h6" gutterBottom>
              {filter.category}
            </Typography>
            <FormGroup>
              {filter.checkboxLabels.map((label) => (
                <FormControlLabel
                  key={label}
                  control={<Checkbox color="success" />}
                  label={label}
                />
              ))}
            </FormGroup>

            {/* Add a divider between categories */}
            {index < filters.length - 1 && <Divider sx={{ my: 2 }} />}
          </div>
        ))}
      </div>
    </aside>
  );
}
