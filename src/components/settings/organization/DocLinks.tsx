import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";

export default function DocPlatformSocialLinks() {
  const [activeTab, setActiveTab] = useState("Document Links");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample Data
  const documentLinks = [
    { title: "AML Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "Client Agreement", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Inactive" },
    { title: "Client Fund Safety", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "Complaints Handling Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "Cookies Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "IB Partner Agreement", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "Order Execution Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "Privacy Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "Risk Disclosure", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "US Clients Policy", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
  ];

  const platformLinks = [
    { title: "Desktop Terminal", url: "https://download.mql5.com/cdn/web/metaqoutes...", os: "Windows", platform: "MT5", status: "Active" },
    { title: "IOS Mobile", url: "https://cdn.brokeret.com/doc/example.pdf", os: "iOS", platform: "MT5", status: "Active" },
    { title: "Web", url: "https://cdn.brokeret.com/doc/example.pdf", os: "Web", platform: "MT5", status: "Active" },
  ];

  const socialLinks = [
    { title: "Discord", url: "https://discord.com/", status: "Active" },
    { title: "Facebook", url: "https://facebook.com/", status: "Active" },
    { title: "Instagram", url: "https://instagram.com/", status: "Active" },
    { title: "Linkedin", url: "https://linkedin.com/", status: "Active" },
    { title: "Skype", url: "https://www.skype.com/en/", status: "Active" },
    { title: "Telegram", url: "https://telegram.org/", status: "Active" },
    { title: "Whatsapp", url: "https://cdn.brokeret.com/doc/example.pdf", status: "Active" },
    { title: "X - Twitter", url: "https://twitter.com/", status: "Active" },
  ];

  const statusClasses = {
    Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Inactive: "bg-red-600/20 text-red-400 border border-red-600",
  };

  const getCurrentPageData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderTable = () => {
    let data: any[] = [];
    let headers: string[] = [];

    switch (activeTab) {
      case "Document Links":
        data = documentLinks;
        headers = ["Title", "URL", "Status", "Action"];
        break;
      case "Platform Links":
        data = platformLinks;
        headers = ["Title", "URL", "Operating System", "Platform", "Status"];
        break;
      case "Social Links":
        data = socialLinks;
        headers = ["Title", "URL", "Status", "Action"];
        break;
    }

    const pageData = getCurrentPageData(data);
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
      <>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} className="p-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx} className="border-t border-[#1a2b40]">
                {activeTab === "Document Links" && (
                  <>
                    <td className="p-3">{row.title}</td>
                    <td className="p-3">{row.url}</td>
                    <td className="p-3">
                      <Badge className={`${statusClasses[row.status]} rounded-md`}>{row.status}</Badge>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Button variant="ghost" size="icon"><Edit size={16} /></Button>
                      <Button variant="ghost" size="icon"><Trash size={16} /></Button>
                    </td>
                  </>
                )}
                {activeTab === "Platform Links" && (
                  <>
                    <td className="p-3">{row.title}</td>
                    <td className="p-3">{row.url}</td>
                    <td className="p-3">{row.os}</td>
                    <td className="p-3">{row.platform}</td>
                    <td className="p-3">
                      <Badge className={`${statusClasses[row.status]} rounded-md`}>{row.status}</Badge>
                    </td>
                  </>
                )}
                {activeTab === "Social Links" && (
                  <>
                    <td className="p-3">{row.title}</td>
                    <td className="p-3">{row.url}</td>
                    <td className="p-3">
                      <Badge className={`${statusClasses[row.status]} rounded-md`}>{row.status}</Badge>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon"><Edit size={16} /></Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* FOOTER INFO + PAGINATION */}
        <div className=" p-2 flex justify-between items-center mt-4 text-gray-400 text-sm">
          <p>
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
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

            <span className="text-white">{currentPage} / {totalPages}</span>

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
      </>
    );
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-5">{activeTab}</h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["Document Links", "Platform Links", "Social Links"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md border ${
              activeTab === tab
                ? "bg-primary text-white border-primary"
                : "bg-muted border-border"
            }`}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">{renderTable()}</CardContent>
      </Card>
    </div>
  );
}
