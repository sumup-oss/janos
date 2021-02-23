function parseDocs(docs) {
  const result = [];
  docs.forEach((resource) => {
    resource = replaceDeprecatedAPIs(resource);
    resource = addSpecSelector(resource);
    result.push(resource);
  });
  return result;
}

function replaceDeprecatedAPIs(resource) {
  let result = Object.assign({}, resource);
  let legacyAPIs;
  switch (result["kind"]) {
    case "Deployment":
    case "Daemonset":
    case "Statefulset":
    case "ReplicaSet":
      legacyAPIs = ["extensions/v1beta1", "apps/v1beta1", "apps/v1beta2"];
      if (legacyAPIs.includes(result["apiVersion"])) {
        console.log(
          `Replace apiVersion for "${resource.kind}" - "${resource.metadata.name}"`
        );
        result.apiVersion = "apps/v1";
      }
      break;

    case "PodSecurityPolicy":
      legacyAPIs = ["extensions/v1beta1", "apps/v1beta2"];
      if (legacyAPIs.includes(result["apiVersion"])) {
        console.log(
          `Replace apiVersion for "${resource.kind}" - "${resource.metadata.name}"`
        );
        result.apiVersion = "policy/v1beta1";
      }
      break;

    case "HorizontalPodAutoscaler":
      legacyAPIs = ["autoscaling/v2beta1"];
      if (legacyAPIs.includes(result["apiVersion"])) {
        console.log(
          `Replace apiVersion for "${resource.kind}" - "${resource.metadata.name}"`
        );
        result.apiVersion = "autoscaling/v2beta2";
      }
      break;

    case "Ingress":
      legacyAPIs = ["extensions/v1beta1"];
      if (legacyAPIs.includes(result["apiVersion"])) {
        console.log(
          `Replace apiVersion for "${resource.kind}" - "${resource.metadata.name}"`
        );
        result.apiVersion = "networking.k8s.io/v1beta1";
      }
      break;

    case "Role":
    case "RoleBinding":
    case "ClusterRole":
    case "ClusterRoleBinding":
      legacyAPIs = [
        "rbac.authorization.k8s.io/v1alpha1",
        "rbac.authorization.k8s.io/v1beta1",
      ];
      if (legacyAPIs.includes(result["apiVersion"])) {
        console.log(
          `Replace apiVersion for "${resource.kind}" - "${resource.metadata.name}"`
        );
        result.apiVersion = "rbac.authorization.k8s.io/v1";
      }
      break;
  }
  return result;
}

function addSpecSelector(resource) {
  let result = Object.assign({}, resource);
  const kinds = ["Deployment", "Daemonset", "Statefulset", "ReplicaSet"];
  if (kinds.includes(result["kind"]) && !result.spec.selector) {
    console.log(
      `Adding spec.selector to "${result.kind}" - "${result.metadata.name}"`
    );
    const labels = Object.assign({}, result.spec.template.metadata.labels);
    const selector = { matchLabels: labels };
    result.spec.selector = selector;
  }
  return result;
}

module.exports = {
  parseDocs,
};
