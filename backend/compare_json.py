import json
import requests

def is_ignored(value):
    """Return True if value should be ignored for comparison."""
    if value is None or value is False or value == "":
        return True
    if isinstance(value, (dict, list)) and len(value) == 0:
        return True
    return False


def compare_json(obj1, obj2):
    """Return a JSON object containing only the differences."""

    # If both ignored values → no diff
    if is_ignored(obj1) and is_ignored(obj2):
        return None

    # Both dicts
    if isinstance(obj1, dict) and isinstance(obj2, dict):
        diff = {}
        for key in set(obj1.keys()) | set(obj2.keys()):
            if key == '_id' or key == '__v':
                continue
            d = compare_json(obj1.get(key), obj2.get(key))
            if d is not None:
                diff[key] = d
        return diff if diff else None

    # Both lists
    if isinstance(obj1, list) and isinstance(obj2, list):
        max_len = max(len(obj1), len(obj2))
        diff_list = []
        any_diff = False

        for i in range(max_len):
            v1 = obj1[i] if i < len(obj1) else None
            v2 = obj2[i] if i < len(obj2) else None
            d = compare_json(v1, v2)

            diff_list.append(d)
            if d is not None:
                any_diff = True

        return diff_list if any_diff else None

    # Primitive comparison
    if obj1 != obj2:
        return {"file1": obj1, "file2": obj2}

    return None


def compare_json_files(json1, json2):
    """
    Compares two JSON objects and RETURNS the complete JSON FILE CONTENT
    as a string, not a Python dict.
    """
    diff = compare_json(json1, json2)
    result = diff if diff is not None else {}

    # Return JSON file content
    return json.dumps(result, indent=4)



# ------------------ RUNNER ------------------

if __name__ == "__main__":
    pass
