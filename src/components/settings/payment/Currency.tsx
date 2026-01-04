import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface CurrencyRate {
  id: number;
  country: string;
  code: string;
  rate: number;
}

const currencyRates: CurrencyRate[] = [
  { id: 1, country: "Zimbabwe", code: "ZWL", rate: 65692.38 },
  { id: 2, country: "Zambia", code: "ZMK", rate: 9001.2 },
  { id: 3, country: "Yemen", code: "YER", rate: 238.79 },
  { id: 4, country: "Western Sahara", code: "MAD", rate: 9.27 },
  { id: 5, country: "Wallis And Futuna", code: "XPF", rate: 103.68 },
  { id: 6, country: "Virgin Islands U.S.", code: "USD", rate: 1 },
  { id: 7, country: "Virgin Islands British", code: "USD", rate: 1 },
  { id: 8, country: "Viet Nam", code: "VND", rate: 26290 },
  { id: 9, country: "Venezuela Bolivarian Republic Of", code: "VEF", rate: 22714172.89 },
  { id: 10, country: "Vanuatu", code: "VUV", rate: 122.1 },
  { id: 11, country: "Uzbekistan", code: "UZS", rate: 12022.92 },
  { id: 12, country: "Uruguay", code: "UYU", rate: 39.85 },
  {
    id: 13,
    country: "United States Minor Outlying Islands",
    code: "USD",
    rate: 1,
  },
];

const ITEMS_PER_PAGE = 10;

export default function Currency() {

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(currencyRates.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = currencyRates.slice(startIndex, endIndex);
  return (
    <div className="w-full">
      {/* HEADER */}
      <h1 className="text-xl font-semibold text-foreground mb-4">
        Currency Rates
      </h1>

      {/* TABLE */}
      <Card >
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/60 text-sm">
            <tr>
              <th className="p-4" >ID</th>
              <th className="p-4">COUNTRY</th>
              <th className="p-4 ">CURRENCY CODE</th>
              <th className="p-4 ">RATE</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border last:border-none hover:bg-muted/40 transition"
              >
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.country}</td>
                <td className="p-4 text-center font-medium">
                  {item.code}
                </td>
                <td className="p-4 text-right">
                  {item.rate.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
          {/* LEFT TEXT */}
          <p>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, currencyRates.length)} of{" "}
            {currencyRates.length} Entries
          </p>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </Button>

            <span className="text-foreground">
              {page} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

      </CardContent>
      </Card>
    </div>
  );
}
