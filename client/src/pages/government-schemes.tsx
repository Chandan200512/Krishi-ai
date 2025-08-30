import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { University, FileText, Calendar, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GovernmentScheme } from "@shared/schema";

export default function GovernmentSchemes() {
  const { data: schemes, isLoading } = useQuery<GovernmentScheme[]>({
    queryKey: ['/api/government-schemes'],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'seasonal': return 'bg-purple-100 text-purple-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-schemes-loading">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="grid gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-government-schemes">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Government Schemes</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Navigate and access government aid and subsidies for farmers
        </p>
      </div>

      {/* Application Tracker */}
      <Card className="bg-indigo-50 border-indigo-200" data-testid="card-application-tracker">
        <CardContent className="p-6">
          <h3 className="font-semibold text-indigo-800 mb-4" data-testid="text-tracker-title">
            📋 Application Tracker
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm" data-testid="text-application-1-name">PM-KISAN Application</p>
                <p className="text-xs text-muted-foreground" data-testid="text-application-1-id">
                  Application ID: PK2024001234
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800" data-testid="badge-application-1-status">
                Under Review
              </Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm" data-testid="text-application-2-name">Soil Health Card</p>
                <p className="text-xs text-muted-foreground" data-testid="text-application-2-id">
                  Application ID: SHC2024005678
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800" data-testid="badge-application-2-status">
                Approved
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="grid gap-6" data-testid="grid-schemes">
        {schemes?.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-md transition-shadow" data-testid={`card-scheme-${scheme.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                    <University className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" data-testid={`text-scheme-name-${scheme.id}`}>
                      {scheme.name}
                    </h3>
                    <p className="text-muted-foreground mb-3" data-testid={`text-scheme-description-${scheme.id}`}>
                      {scheme.description}
                    </p>
                    <Badge className={getStatusColor(scheme.status)} data-testid={`badge-scheme-status-${scheme.id}`}>
                      {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <Button data-testid={`button-apply-scheme-${scheme.id}`}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center" data-testid={`text-eligibility-title-${scheme.id}`}>
                    <FileText className="w-4 h-4 mr-2" />
                    Eligibility
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {scheme.eligibility.map((criterion, index) => (
                      <li key={index} data-testid={`text-eligibility-${scheme.id}-${index}`}>
                        • {criterion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" data-testid={`text-benefits-title-${scheme.id}`}>Benefits</h4>
                  <p className="text-sm text-muted-foreground" data-testid={`text-benefits-${scheme.id}`}>
                    {scheme.benefits}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" data-testid={`text-documents-title-${scheme.id}`}>
                    Required Documents
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {scheme.documentsRequired.map((document, index) => (
                      <li key={index} data-testid={`text-document-${scheme.id}-${index}`}>
                        • {document}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {scheme.applicationDeadline && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center text-amber-800">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium" data-testid={`text-deadline-${scheme.id}`}>
                      Application Deadline: {new Date(scheme.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {schemes?.length === 0 && !isLoading && (
        <Card data-testid="card-no-schemes">
          <CardContent className="p-12 text-center">
            <University className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2" data-testid="text-no-schemes-title">No schemes available</h3>
            <p className="text-muted-foreground" data-testid="text-no-schemes-description">
              Check back later for new government schemes and programs
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
