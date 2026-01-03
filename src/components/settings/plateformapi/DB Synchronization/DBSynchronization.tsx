import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InputField } from "@/components/form/InputField";

export default function DBSynchronization() {
  const [selectedDatabase, setSelectedDatabase] = useState("MySQL");
  const [formData, setFormData] = useState({
    databaseHost: "134.119.178.210",
    databasePort: "3306",
    databaseName: "mbfxadmin_mt5db",
    databaseUsername: "mbfxadmin_crmuser",
    databasePassword: "••••••••••••",
  });

  const databases = [
    { name: "MySQL", logo: "🐬", recommended: true },
    { name: "PostgreSQL", logo: "🐘", recommended: false },
    { name: "SQL Server", logo: "🗄️", recommended: false },
    { name: "Oracle", logo: "⚡", recommended: false },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
       
        <div>
          <h2 className="text-xl font-semibold">Database Synchronization</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Effortlessly connect and synchronize your application with a variety of database types. Choose your database system associated with your trading platform to ensure seamless integration and real-time data synchronization for optimal performance.
          </p>
        </div>
      </div>

      {/* Database Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {databases.map((db) => (
          <div
            key={db.name}
            onClick={() => setSelectedDatabase(db.name)}
            className={`relative cursor-pointer p-6 border-2 rounded-lg transition-all hover:border-primary ${
              selectedDatabase === db.name
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            {db.recommended && (
              <Badge className="absolute top-2 right-2 text-xs">
                Recommended
              </Badge>
            )}
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl">{db.logo}</div>
              <h3 className="font-semibold text-center">{db.name}</h3>
            </div>
            {selectedDatabase === db.name && (
              <CheckCircle2 className="absolute bottom-2 right-2 w-5 h-5 text-primary" />
            )}
          </div>
        ))}
      </div>

      {/* Show form only for MySQL, otherwise show Feature Not Available */}
      {selectedDatabase === "MySQL" ? (
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Database Host and Port */}
            <div className="grid grid-cols-12 gap-5">
              <div className="md:col-span-6 col-span-12">
                <InputField
                  label="Database Host"
                  tooltip="The IP address or domain where the database server is hosted (e.g., 127.0.0.1 for localhost)"
                  type="text"
                  value={formData.databaseHost}
                  onChange={(e) =>
                    handleInputChange("databaseHost", e.target.value)
                  }
                  placeholder="Database Host"
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <InputField
                  label="Database Port"
                  tooltip="Port number used to connect to the selected database type (e.g., 3306 for MySQL)"
                  type="text"
                  value={formData.databasePort}
                  onChange={(e) =>
                    handleInputChange("databasePort", e.target.value)
                  }
                  placeholder="3306"
                />
              </div>
            </div>

            {/* Database Name and Username */}
            <div className="grid grid-cols-12 gap-5">
              <div className="md:col-span-6 col-span-12">
                <InputField
                  label="Database Name"
                  tooltip="The name of the specific database to sync data with"
                  type="text"
                  value={formData.databaseName}
                  onChange={(e) =>
                    handleInputChange("databaseName", e.target.value)
                  }
                  placeholder="Database Name"
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <InputField
                  label="Database Username"
                  tooltip="Username credential used to authenticate database access"
                  type="text"
                  value={formData.databaseUsername}
                  onChange={(e) =>
                    handleInputChange("databaseUsername", e.target.value)
                  }
                  placeholder="Database Username"
                />
              </div>
            </div>

            {/* Database Password */}
            <div className="grid grid-cols-12 gap-5">
              <div className="md:col-span-6 col-span-12">
                <InputField
                  label="Database Password"
                  tooltip="Password for the above database username"
                  type="password"
                  value={formData.databasePassword}
                  onChange={(e) =>
                    handleInputChange("databasePassword", e.target.value)
                  }
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button>Save Changes</Button>
              <Button variant="outline">Test Connection</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-destructive flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-semibold">Feature Not Available</h3>
              <p className="text-muted-foreground max-w-2xl">
                This feature is not currently associated with your account or plan. To unlock this feature, please contact us to upgrade your account or activate it.
              </p>
              <p className="text-sm text-muted-foreground">
                For assistance, reach out to our support team or visit{" "}
                <a
                  href="https://www.xyz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  www.xyz.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
