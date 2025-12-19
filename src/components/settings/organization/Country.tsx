import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Country() {
  const [activeTab, setActiveTab] = useState("All Countries");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // All Countries Data
  const countryData = [
    { id: 249, country: "Afghanistan", code: 4, iso2: "AF", iso3: "AFG", currency: "AFN" },
    { id: 248, country: "Aland Islands", code: 248, iso2: "AX", iso3: "ALA", currency: "EUR" },
    { id: 247, country: "Albania", code: 8, iso2: "AL", iso3: "ALB", currency: "ALL" },
    { id: 246, country: "Algeria", code: 12, iso2: "DZ", iso3: "DZA", currency: "DZD" },
    { id: 245, country: "Andorra", code: 20, iso2: "AD", iso3: "AND", currency: "EUR" },
    { id: 244, country: "Angola", code: 24, iso2: "AO", iso3: "AGO", currency: "AOA" },
    { id: 243, country: "Argentina", code: 32, iso2: "AR", iso3: "ARG", currency: "ARS" },
    { id: 242, country: "Armenia", code: 51, iso2: "AM", iso3: "ARM", currency: "AMD" },
    { id: 241, country: "Aruba", code: 533, iso2: "AW", iso3: "ABW", currency: "AWG" },
    { id: 240, country: "Australia", code: 36, iso2: "AU", iso3: "AUS", currency: "AUD" },
    { id: 239, country: "Austria", code: 40, iso2: "AT", iso3: "AUT", currency: "EUR" },
    // Add more items...
  ];

  // Blacklisted Countries Data
  const blacklistData = [
    { id: 100, country: "North Korea", status: 408, action: "KP" },
    { id: 101, country: "Syria", status: 760, action: "SY" },
    { id: 102, country: "Iran", status: 364, action: "IR" },
    // Add more items...
  ];

  // Get active data based on tab
  const activeData = activeTab === "All Countries" ? countryData : blacklistData;

  // Pagination Calculations
  const totalItems = activeData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const paginatedData = activeData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Reset page when switching tab
  const changeTab = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className=" text-white">
      <h1 className="text-2xl font-semibold mb-6">Countries</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["All Countries", "Blacklist Countries"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md border ${
              activeTab === tab
                ? "bg-primary text-white border-primary"
                : "bg-muted border-border"
            }`}
            onClick={() => changeTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE CONTAINER */}
      <Card>
        <CardContent className="p-0">

          {/* ---------------- ALL COUNTRIES TABLE ---------------- */}
          {activeTab === "All Countries" && (
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">COUNTRY</th>
                  <th className="p-3">CODE</th>
                  <th className="p-3">ISO2</th>
                  <th className="p-3">ISO3</th>
                  <th className="p-3">CURRENCY</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, i) => (
                  <tr key={i} className="border-t border-[#1a2b40]">
                    <td className="p-3">{row.id}</td>
                    <td className="p-3">{row.country}</td>
                    <td className="p-3">{row.code}</td>
                    <td className="p-3">{row.iso2}</td>
                    <td className="p-3">{row.iso3}</td>
                    <td className="p-3">{row.currency}</td>
                    <td className="p-3">
                      <Switch defaultChecked />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ---------------- BLACKLIST TABLE ---------------- */}
          {activeTab === "Blacklist Countries" && (
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr>
                  <th className="p-3">COUNTRY</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, i) => (
                  <tr key={i} className="border-t border-[#1a2b40]">
                    <td className="p-3">{row.country}</td>
                    <td className="p-3">{row.status}</td>
                    <td className="p-3">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </CardContent>
      </Card>

      {/* FOOTER INFO + PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
        <p>
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
          {totalItems} results
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>

          <span className="text-white">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
